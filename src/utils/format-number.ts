export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}k`
  }
  return num.toString()
}


export function removeCommasAndSpaces(num: string): string {
  return num.replace(/,/g, '').replace(/ /g, '')
}

