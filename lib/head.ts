export const head = <T>(arr: T[] | null | undefined | ArrayLike<T>): T | undefined => {
  if (!arr) {
    return undefined
  }

  return arr[0]
}