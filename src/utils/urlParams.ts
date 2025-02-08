import type { ReadonlyURLSearchParams } from "next/navigation"

export function setParams(
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  newParams: Record<string, string | null>,
): string {
  const current = new URLSearchParams(Array.from(searchParams.entries()))

  Object.entries(newParams).forEach(([key, value]) => {
    if (value === null) {
      current.delete(key)
    } else {
      current.set(key, value)
    }
  })

  const search = current.toString()
  const query = search ? `?${search}` : ""

  return `${pathname}${query}`
}

