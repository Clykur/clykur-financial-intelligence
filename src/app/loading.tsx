export default function Loading() {
  return (
    <div
      className="min-h-[50vh] bg-background site-page-pad"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="site-container animate-pulse space-y-6 px-4 sm:px-6">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-12 max-w-xl rounded bg-muted" />
        <div className="h-6 max-w-lg rounded bg-muted" />
      </div>
    </div>
  );
}
