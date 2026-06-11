export const BIRTH_YEAR = 2007

export function getAge(referenceDate = new Date()): number {
  return referenceDate.getFullYear() - BIRTH_YEAR
}
