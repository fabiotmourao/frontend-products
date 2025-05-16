import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center mt-6">
      <nav className="flex items-center space-x-1 text-sm text-gray-700">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          ← Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'text-blue-600 underline' : 'hover:bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Próximo →
        </button>
      </nav>
    </div>
  );
}; 