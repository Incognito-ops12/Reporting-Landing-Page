import { getJson } from './client'
import type {
  DepartmentReportRow,
  ProjectReportRow,
  ReportMetadata,
  UserReportRow,
} from '../types/reports'

const reportsPath = '/api/reports'

export function getReports(): Promise<ReportMetadata[]> {
  return getJson<ReportMetadata[]>(reportsPath)
}

export function getUsersReport(): Promise<UserReportRow[]> {
  return getJson<UserReportRow[]>(`${reportsPath}/users`)
}

export function getDepartmentsReport(): Promise<DepartmentReportRow[]> {
  return getJson<DepartmentReportRow[]>(`${reportsPath}/departments`)
}

export function getProjectsReport(): Promise<ProjectReportRow[]> {
  return getJson<ProjectReportRow[]>(`${reportsPath}/projects`)
}
