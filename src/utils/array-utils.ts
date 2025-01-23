export function shuffle<T>(array: readonly T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}
