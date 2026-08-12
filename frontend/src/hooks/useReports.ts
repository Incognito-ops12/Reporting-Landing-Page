import { useQuery } from '@tanstack/react-query'
import {
  getDepartmentsReport,
  getProjectsReport,
  getReports,
  getUsersReport,
} from '../api/reports'

export const reportKeys = {
  all: ['reports'] as const,
  users: ['reports', 'users'] as const,
  departments: ['reports', 'departments'] as const,
  projects: ['reports', 'projects'] as const,
}

export function useReports() {
  return useQuery({ queryKey: reportKeys.all, queryFn: getReports })
}

export function useUsersReport() {
  return useQuery({ queryKey: reportKeys.users, queryFn: getUsersReport })
}

export function useDepartmentsReport() {
  return useQuery({
    queryKey: reportKeys.departments,
    queryFn: getDepartmentsReport,
  })
}

export function useProjectsReport() {
  return useQuery({ queryKey: reportKeys.projects, queryFn: getProjectsReport })
}
