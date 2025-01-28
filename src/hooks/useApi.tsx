/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR, { type SWRConfiguration, type SWRResponse } from "swr"
import { fetcher } from "@/lib/fetcher"

export function useApi<Data = any, Error = any>(url: string, options?: SWRConfiguration): SWRResponse<Data, Error> {
  return useSWR<Data, Error>(url, fetcher, options)
}



