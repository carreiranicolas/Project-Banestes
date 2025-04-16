
import React, { useEffect, useState } from 'react';
import { Cliente, Conta, Agencia } from '../types';
import { ArrowLeft, User, Mail, Calendar, MapPin, Wallet, Banknote, Building } from 'lucide-react';
import { formatCurrency, formatDate, formatCpfCnpj, findContasByCliente, findAgenciaByCodigo } from '../lib/api';
import AccountCard from './AccountCard';
import AgencyCard from './AgencyCard';
import Loading from './ui/loading';
import Error from './ui/error';

interface ClientDetailsProps {
  cliente: Cliente | null;
  contas: Conta[];
  agencias: Agencia[];
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

/**
 * Componente para exibir detalhes completos de um cliente selecionado
 */
const ClientDetails: React.FC<ClientDetailsProps> = ({ 
  cliente, 
  contas, 
  agencias, 
  onBack,
  isLoading,
  error
}) => {
  const [clienteContas, setClienteContas] = useState<Conta[]>([]);
  const [clienteAgencia, setClienteAgencia] = useState<Agencia | null>(null);

  useEffect(() => {
    if (cliente && contas.length > 0) {
      // Encontra todas as contas do cliente
      const contasDoCliente = findContasByCliente(cliente.cpfCnpj, contas);
      setClienteContas(contasDoCliente);
    }
  }, [cliente, contas]);

  useEffect(() => {
    if (cliente && agencias.length > 0) {
      // Encontra a agência do cliente
      const agencia = findAgenciaByCodigo(cliente.codigoAgencia, agencias);
      setClienteAgencia(agencia || null);
    }
  }, [cliente, agencias]);

  if (isLoading) {
    return <Loading message="Carregando detalhes do cliente..." />;
  }

  if (error) {
    return <Error message={error} onRetry={onBack} />;
  }

  if (!cliente) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-muted-foreground">Selecione um cliente para ver seus detalhes.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Cabeçalho com informações básicas e botão de voltar */}
      <div className="mb-8">
        <button 
          onClick={onBack}
          className="flex items-center text-primary hover:underline mb-4"
          aria-label="Voltar para lista de clientes"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para lista de clientes
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{cliente.nomeSocial || cliente.nome}</h1>
            <p className="text-muted-foreground">{formatCpfCnpj(cliente.cpfCnpj)}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end space-y-1">
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              Cliente desde {formatDate(cliente.dataNascimento)}
            </div>
            <span className="text-xs text-muted-foreground">
              ID: {cliente.id}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coluna com informações pessoais */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Informações pessoais</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Nome completo</h3>
                  <p>{cliente.nome}</p>
                  {cliente.nomeSocial && (
                    <div className="mt-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Nome social</h3>
                      <p>{cliente.nomeSocial}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Data de nascimento</h3>
                  <p>{formatDate(cliente.dataNascimento)}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p>{cliente.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Estado civil</h3>
                  <p>{cliente.estadoCivil}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:col-span-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Endereço</h3>
                  <p>{cliente.endereco}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Informações financeiras</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Wallet className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Patrimônio</h3>
                  <p className="font-medium">{formatCurrency(cliente.patrimonio)}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Banknote className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Renda anual</h3>
                  <p className="font-medium">{formatCurrency(cliente.rendaAnual)}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Contas bancárias</h2>
            
            {clienteContas.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {clienteContas.map((conta) => (
                  <AccountCard key={conta.id} conta={conta} />
                ))}
              </div>
            ) : (
              <div className="text-center p-4 border rounded-lg bg-secondary/30">
                <p className="text-muted-foreground">Este cliente não possui contas bancárias.</p>
              </div>
            )}
          </div>
        </div>

        {/* Coluna com informações da agência */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Agência</h2>
          
          {clienteAgencia ? (
            <AgencyCard agencia={clienteAgencia} className="bg-white" />
          ) : (
            <div className="text-center p-4 border rounded-lg bg-secondary/30">
              <p className="text-muted-foreground">Informações da agência não disponíveis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
