const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 border border-yellow-400 text-yellow-400 rounded disabled:opacity-40"
      >
        Prev
      </button>

      <span className="px-4 py-2 text-white">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 border border-yellow-400 text-yellow-400 rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
