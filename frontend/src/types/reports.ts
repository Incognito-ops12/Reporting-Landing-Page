export type ReportId = 'users' | 'departments' | 'projects'

export interface ReportMetadata {
  id: ReportId
  name: string
  description: string
  lastUpdated: string
  rowCount: number
}

export type UserStatus = 'ACTIVE' | 'INACTIVE'

export interface UserReportRow {
  userId: string
  name: string
  email: string
  role: string
  status: UserStatus
  createdDate: string
}

export interface DepartmentReportRow {
  departmentId: string
  departmentName: string
  manager: string
  employeeCount: number
  location: string
}

export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'PLANNED' | 'ON_HOLD'

export interface ProjectReportRow {
  projectId: string
  projectName: string
  department: string
  owner: string
  status: ProjectStatus
  startDate: string
  endDate: string | null
}
