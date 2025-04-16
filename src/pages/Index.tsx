
import { useEffect, useState } from 'react';
import { Cliente, Conta, Agencia } from '../types';
import { fetchClientes, fetchContas, fetchAgencias } from '../lib/api';
import ClientList from '../components/ClientList';
import ClientDetails from '../components/ClientDetails';
import SearchFilter, { FilterOptions } from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import Loading from '../components/ui/loading';
import Error from '../components/ui/error';
import { Building, Users } from 'lucide-react';

const Index = () => {
  // Estados para armazenar dados
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para filtros e paginação
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  
  const ITEMS_PER_PAGE = 10;

  // Carregar dados iniciais
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Carregar dados em paralelo para melhor performance
        const [clientesData, contasData, agenciasData] = await Promise.all([
          fetchClientes(),
          fetchContas(),
          fetchAgencias()
        ]);
        
        setClientes(clientesData);
        setContas(contasData);
        setAgencias(agenciasData);
        setFilteredClientes(clientesData);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Não foi possível carregar os dados. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Filtrar clientes com base no termo de busca e opções de filtro
  useEffect(() => {
    if (!clientes.length) return;
    
    let result = [...clientes];
    
    // Aplicar filtro de pesquisa por nome ou CPF/CNPJ
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        cliente => 
          cliente.nome.toLowerCase().includes(term) || 
          cliente.cpfCnpj.includes(term) ||
          (cliente.nomeSocial && cliente.nomeSocial.toLowerCase().includes(term))
      );
    }
    
    // Aplicar filtro de estado civil
    if (filterOptions.estadoCivil) {
      result = result.filter(cliente => cliente.estadoCivil === filterOptions.estadoCivil);
    }
    
    // Aplicar filtro de tipo de documento (CPF ou CNPJ)
    if (filterOptions.tipoDocumento) {
      if (filterOptions.tipoDocumento === 'CPF') {
        result = result.filter(cliente => cliente.cpfCnpj.length === 11);
      } else if (filterOptions.tipoDocumento === 'CNPJ') {
        result = result.filter(cliente => cliente.cpfCnpj.length === 14);
      }
    }
    
    setFilteredClientes(result);
    setCurrentPage(1); // Resetar para a primeira página quando os filtros mudam
  }, [searchTerm, filterOptions, clientes]);

  // Calcular clientes da página atual
  const getCurrentPageClientes = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredClientes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  // Total de páginas baseado na quantidade de clientes filtrados
  const totalPages = Math.max(1, Math.ceil(filteredClientes.length / ITEMS_PER_PAGE));

  // Manipuladores de eventos
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = (options: FilterOptions) => {
    setFilterOptions(options);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleClientSelect = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedCliente(null);
  };

  // Tentar novamente em caso de erro
  const handleRetry = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Error message={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {selectedCliente ? (
        <ClientDetails 
          cliente={selectedCliente} 
          contas={contas} 
          agencias={agencias} 
          onBack={handleBackToList} 
          isLoading={false}
          error={null}
        />
      ) : (
        <div>
          {/* Cabeçalho */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Sistema Bancário</h1>
            <p className="text-muted-foreground">
              Gerenciamento de clientes, contas e agências
            </p>
          </header>

          {/* Resumo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white border rounded-lg p-4 flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total de Clientes</p>
                <p className="text-2xl font-semibold">{clientes.length}</p>
              </div>
            </div>
            
            <div className="bg-white border rounded-lg p-4 flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total de Agências</p>
                <p className="text-2xl font-semibold">{agencias.length}</p>
              </div>
            </div>
          </div>

          {/* Busca e filtros */}
          <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />

          {/* Lista de clientes */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <h2 className="text-xl font-semibold p-4 border-b">
              Lista de Clientes
              {filteredClientes.length > 0 && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({filteredClientes.length} encontrados)
                </span>
              )}
            </h2>
            
            <ClientList 
              clientes={getCurrentPageClientes()} 
              onClientSelect={handleClientSelect} 
            />
            
            {/* Paginação */}
            {filteredClientes.length > 0 && (
              <div className="p-4 border-t">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange} 
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
