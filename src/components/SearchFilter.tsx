import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchFilterProps {
  onSearch: (term: string) => void;
  onFilter: (filterOptions: FilterOptions) => void;
}

export interface FilterOptions {
  estadoCivil?: "" | "Solteiro" | "Casado" | "Viúvo" | "Divorciado";
  tipoDocumento?: "" | "CPF" | "CNPJ";
}

/**
 * Componente para busca e filtro de clientes
 */
const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    estadoCivil: "",
    tipoDocumento: "",
  });

  // Manipula mudanças no campo de busca
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  // Limpa o campo de busca
  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  // Manipula mudanças nos filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilterOptions = { 
      ...filterOptions, 
      [name]: value as "" | "Solteiro" | "Casado" | "Viúvo" | "Divorciado" | "CPF" | "CNPJ" 
    };
    setFilterOptions(newFilterOptions);
    onFilter(newFilterOptions);
  };

  // Limpa todos os filtros
  const handleClearFilters = () => {
    const resetFilters: FilterOptions = {
      estadoCivil: "" , 
      tipoDocumento: "",
    };
    setFilterOptions(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Campo de busca */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Buscar por nome ou CPF/CNPJ..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-10 py-2 border rounded-md focus:ring focus:ring-primary/20 focus:border-primary transition-all"
          aria-label="Buscar clientes"
        />
        {searchTerm && (
          <button 
            className="absolute inset-y-0 right-0 pr-3 flex items-center" 
            onClick={handleClearSearch}
            aria-label="Limpar busca"
          >
            <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>

      {/* Botão de filtro */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-sm font-medium"
          aria-expanded={showFilters}
          aria-controls="filter-options"
        >
          <Filter className="h-4 w-4" />
          <span>{showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}</span>
        </button>

        {showFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-primary hover:underline"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Opções de filtro */}
      {showFilters && (
        <div id="filter-options" className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-md animate-fade-in">
          <div>
            <label htmlFor="estadoCivil" className="block text-sm font-medium mb-1">
              Estado Civil
            </label>
            <select
              id="estadoCivil"
              name="estadoCivil"
              value={filterOptions.estadoCivil}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Todos</option>
              <option value="Solteiro">Solteiro</option>
              <option value="Casado">Casado</option>
              <option value="Viúvo">Viúvo</option>
              <option value="Divorciado">Divorciado</option>
            </select>
          </div>

          <div>
            <label htmlFor="tipoDocumento" className="block text-sm font-medium mb-1">
              Tipo de Documento
            </label>
            <select
              id="tipoDocumento"
              name="tipoDocumento"
              value={filterOptions.tipoDocumento}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Todos</option>
              <option value="CPF">CPF</option>
              <option value="CNPJ">CNPJ</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
