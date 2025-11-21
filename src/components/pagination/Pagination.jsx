import "./Pagination.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const maxVisible = 8; 

  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>

      {pages[0] > 1 && (
        <>
          <button className="pagination-btn" onClick={() => onPageChange(1)}>
            1
          </button>
          {pages[0] > 2 && <span className="pagination-ellipsis">…</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-btn ${page === currentPage ? "active" : ""}`}
        >
          {page}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="pagination-ellipsis">…</span>
          )}
          <button
            className="pagination-btn"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
}
