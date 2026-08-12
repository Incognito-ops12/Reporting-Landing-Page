interface IconProps {
  name:
    | 'building'
    | 'calendar'
    | 'chevron'
    | 'download'
    | 'folder'
    | 'grid'
    | 'inbox'
    | 'refresh'
    | 'search'
    | 'users'
  className?: string
}

export function Icon({ name, className = 'size-5' }: IconProps) {
  const paths = {
    building: (
      <>
        <path d="M4 21h16M6 21V5l6-2v18M18 21V9l-6-2M9 8h.01M9 12h.01M9 16h.01M15 12h.01M15 16h.01" />
      </>
    ),
    calendar: (
      <>
        <path d="M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    download: (
      <>
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" />
      </>
    ),
    folder: <path d="M3 7h7l2 2h9v11H3V7Zm0 0V5h7l2 2" />,
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    inbox: (
      <>
        <path d="M4 6h16l2 13H2L4 6Z" />
        <path d="M2.5 15h5l1.5 2h6l1.5-2h5" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M4 17v-5h5" />
        <path d="M6.1 8a7 7 0 0 1 11.5-1L20 12M4 12l2.4 5a7 7 0 0 0 11.5-1" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}
