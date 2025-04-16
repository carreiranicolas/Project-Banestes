
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Componente de paginação para navegar entre páginas
 */
const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  // Gera os números das páginas a serem exibidos
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    
    // Sempre exibir a primeira página
    pages.push(1);
    
    // Se tivermos mais de 7 páginas, usamos elipses para páginas intermediárias
    if (totalPages > 7) {
      // Se estivermos nas primeiras páginas
      if (currentPage < 5) {
        pages.push(2, 3, 4, 5, '...', totalPages);
      } 
      // Se estivermos nas últimas páginas
      else if (currentPage > totalPages - 4) {
        pages.push('...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } 
      // Se estivermos no meio
      else {
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    } else {
      // Se tivermos menos de 7 páginas, exibimos todas
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex justify-center items-center mt-6" aria-label="Paginação">
      <ul className="flex items-center space-x-1">
        {/* Botão de página anterior */}
        <li>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </li>
        
        {/* Números das páginas */}
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {typeof page === 'number' ? (
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                }`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ) : (
              <span className="px-3 py-1">...</span>
            )}
          </li>
        ))}
        
        {/* Botão de próxima página */}
        <li>
          <button
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            aria-label="Próxima página"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
