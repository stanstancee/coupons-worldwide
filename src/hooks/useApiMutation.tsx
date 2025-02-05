/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSWRConfig } from "swr";
import { getApiUrl } from "@/config/api";
import { decryptData } from "@/lib/crypto";
import Cookies from "js-cookie";
import { revalidatePath, revalidateTag } from "next/cache";

type MutationResponse<Data, ErrorType = Error> = {
  data: Data | null;
  error: ErrorType | null;
  trigger: (data?: any, options?: RequestInit) => Promise<Data>;
  isMutating: boolean;
};

type MutationOptions<Data, ErrorType = Error> = {
  onSuccess?: (data: Data) => void | Promise<void>;
  onError?: (error: ErrorType) => void | Promise<void>;
  revalidatePaths?: string[];
  revalidateTags?: string[];
};

export function useApiMutation<Data = any, ErrorType = Error>(
  url: string,
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  options?: MutationOptions<Data, ErrorType>
): MutationResponse<Data, ErrorType> {
  const [isMutating, setIsMutating] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);
  const { mutate } = useSWRConfig();

  const trigger = async (mutationData?: any, requestOptions?: RequestInit) => {
    setIsMutating(true);
    setError(null);

    try {
      const token = Cookies.get("token") || "";
      const decryptedToken = decryptData(token);

      const defaultOptions: RequestInit = {
        method: method || "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Merge default options with provided options
      const mergedOptions: RequestInit = {
        ...defaultOptions,
        ...requestOptions,
        headers: {
          ...defaultOptions.headers,
          ...(requestOptions?.headers || {}),
        },
      };

      // Ensure headers is defined
      mergedOptions.headers = mergedOptions.headers || {};

      // Add token to headers if available
      if (token) {
        mergedOptions.headers = {
          ...mergedOptions.headers,
          Authorization: `Bearer ${decryptedToken}`,
        };
      }

      // Handle different payload formats
      if (mutationData instanceof FormData) {
        if (mergedOptions.headers instanceof Headers) {
          mergedOptions.headers.delete("Content-Type");
        } else if (mergedOptions.headers) {
          delete (mergedOptions.headers as Record<string, string>)[
            "Content-Type"
          ];
        }
      } else if (
        typeof mutationData === "object" &&
        !(mutationData instanceof FormData)
      ) {
        mergedOptions.body = JSON.stringify(mutationData);
      } else {
        mergedOptions.body = mutationData;
      }

      const response = await fetch(getApiUrl(url), mergedOptions);

      if (!response.ok) {
        const error = new Error("An error occurred while fetching the data.");
        (error as any).info = await response.json();
        (error as any).status = response.status;
        throw error;
      }

      const result = await response.json();
      setData(result);

      // Call onSuccess callback if provided
      if (options?.onSuccess) {
        await options.onSuccess(result);
      }

      // Invalidate SWR cache
      await mutate(url);

      // Invalidate Next.js cache
      if (options?.revalidatePaths) {
        options.revalidatePaths.forEach((path) => revalidatePath(path));
      }
      if (options?.revalidateTags) {
        options.revalidateTags.forEach((tag) => revalidateTag(tag));
      }

      return result;
    } catch (err) {
      setError(err as ErrorType);

      // Call onError callback if provided
      if (options?.onError) {
        await options.onError(err as ErrorType);
      }

      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  return { data, error, trigger, isMutating };
}
