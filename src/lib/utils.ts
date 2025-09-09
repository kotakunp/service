import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeTrailingSlash(path: string) {
  return path.replace(/\/$/, "")
}

export function createURL(
  base: string,
  oldParams: Record<string, unknown>,
  newParams: Record<string, string | undefined>
) {
  const safeOldParams: Record<string, string> = Object.fromEntries(
    Object.entries(oldParams).filter(
      ([, value]) => typeof value === "string"
    ) as [string, string][]
  )

  const params = new URLSearchParams(safeOldParams)

  Object.entries(newParams).forEach(([key, value]) => {
    if (value == null) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
  })

  return `${base}?${params.toString()}`
}
