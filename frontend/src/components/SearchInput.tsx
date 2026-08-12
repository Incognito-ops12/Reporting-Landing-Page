interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <label className="sr-only" htmlFor="report-search">
        Search reports by name
      </label>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeWidth="2"
          d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
        />
      </svg>
      <input
        id="report-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search reports"
        className="h-12 w-full rounded-lg border border-slate-300 bg-white pr-4 pl-11 text-sm text-slate-950 shadow-sm placeholder:text-slate-400 hover:border-slate-400"
      />
    </div>
  )
}
