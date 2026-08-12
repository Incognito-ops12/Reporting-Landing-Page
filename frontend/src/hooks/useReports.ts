import { useQuery } from '@tanstack/react-query'
import { getReports } from '../api/reports'

export const reportKeys = {
  all: ['reports'] as const,
}

export function useReports() {
  return useQuery({ queryKey: reportKeys.all, queryFn: getReports })
}
