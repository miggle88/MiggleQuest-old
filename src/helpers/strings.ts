export function toTitleCase(value: string): string {
  return value[0].toUpperCase() + value.slice(1).toLowerCase()
}
