export const CAREER_START_YEAR = 2023

export function getYearsExperience(referenceDate = new Date()): number {
  return Math.max(1, referenceDate.getFullYear() - CAREER_START_YEAR)
}
