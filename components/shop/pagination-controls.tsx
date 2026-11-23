type PaginationControlsProps = {
  page: number;
  pageCount: number;
  sectionName: string;
  onPageChange: (page: number) => void;
};

export function PaginationControls({ page, pageCount, sectionName, onPageChange }: PaginationControlsProps) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label={`${sectionName} pages`} className="mt-8 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-45"
      >
        Previous
      </button>
      <p className="min-w-24 text-center text-sm text-muted-foreground" aria-live="polite">
        Page <span className="font-semibold text-foreground">{page}</span> of {pageCount}
      </p>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
        className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-45"
      >
        Next
      </button>
    </nav>
  );
}
