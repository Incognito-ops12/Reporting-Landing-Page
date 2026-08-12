import type { TableColumn } from '../components/DataTable'
import { StatusBadge } from '../components/StatusBadge'
import type {
  DepartmentReportRow,
  ProjectReportRow,
  UserReportRow,
} from '../types/reports'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeZone: 'UTC',
})

function formatDate(value: string): string {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`))
}

export const userColumns: TableColumn<UserReportRow>[] = [
  {
    key: 'userId',
    header: 'User ID',
    render: (row) => (
      <span className="font-medium text-slate-950">{row.userId}</span>
    ),
  },
  { key: 'name', header: 'Name', render: (row) => row.name },
  {
    key: 'email',
    header: 'Email',
    render: (row) => (
      <a className="text-blue-700 hover:underline" href={`mailto:${row.email}`}>
        {row.email}
      </a>
    ),
  },
  { key: 'role', header: 'Role', render: (row) => row.role },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: 'createdDate',
    header: 'Created Date',
    render: (row) => (
      <time dateTime={row.createdDate}>{formatDate(row.createdDate)}</time>
    ),
  },
]

export const departmentColumns: TableColumn<DepartmentReportRow>[] = [
  {
    key: 'departmentId',
    header: 'Department ID',
    render: (row) => (
      <span className="font-medium text-slate-950">{row.departmentId}</span>
    ),
  },
  {
    key: 'departmentName',
    header: 'Department Name',
    render: (row) => row.departmentName,
  },
  { key: 'manager', header: 'Manager', render: (row) => row.manager },
  {
    key: 'employeeCount',
    header: 'Employee Count',
    align: 'right',
    render: (row) => row.employeeCount.toLocaleString(),
  },
  { key: 'location', header: 'Location', render: (row) => row.location },
]

export const projectColumns: TableColumn<ProjectReportRow>[] = [
  {
    key: 'projectId',
    header: 'Project ID',
    render: (row) => (
      <span className="font-medium text-slate-950">{row.projectId}</span>
    ),
  },
  {
    key: 'projectName',
    header: 'Project Name',
    render: (row) => row.projectName,
  },
  { key: 'department', header: 'Department', render: (row) => row.department },
  { key: 'owner', header: 'Owner', render: (row) => row.owner },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: 'startDate',
    header: 'Start Date',
    render: (row) => (
      <time dateTime={row.startDate}>{formatDate(row.startDate)}</time>
    ),
  },
  {
    key: 'endDate',
    header: 'End Date',
    render: (row) =>
      row.endDate ? (
        <time dateTime={row.endDate}>{formatDate(row.endDate)}</time>
      ) : (
        <span className="text-slate-500" aria-label="Not scheduled">
          —
        </span>
      ),
  },
]
