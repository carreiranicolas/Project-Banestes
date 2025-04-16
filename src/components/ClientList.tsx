
import React from 'react';
import { Cliente } from '../types';
import { formatCpfCnpj, formatDate, formatCurrency } from '../lib/api';
import { User, ChevronRight } from 'lucide-react';

interface ClientListProps {
  clientes: Cliente[];
  onClientSelect: (cliente: Cliente) => void;
}

/**
 * Componente para exibir a lista de clientes
 */
const ClientList: React.FC<ClientListProps> = ({ clientes, onClientSelect }) => {
  if (clientes.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-secondary/20">
        <User className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
        <p className="text-lg text-muted-foreground">Nenhum cliente encontrado.</p>
        <p className="text-sm text-muted-foreground">Tente ajustar os filtros de busca.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-secondary text-left">
            <th className="p-3 font-medium">Nome</th>
            <th className="p-3 font-medium">CPF/CNPJ</th>
            <th className="p-3 font-medium hidden md:table-cell">Email</th>
            <th className="p-3 font-medium hidden md:table-cell">Data de Nascimento</th>
            <th className="p-3 font-medium text-right">Patrimônio</th>
            <th className="p-3 w-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {clientes.map((cliente) => (
            <tr 
              key={cliente.id} 
              className="hover:bg-secondary/30 transition-colors cursor-pointer" 
              onClick={() => onClientSelect(cliente)}
            >
              <td className="p-3">
                <div className="font-medium">{cliente.nomeSocial || cliente.nome}</div>
                {cliente.nomeSocial && (
                  <div className="text-xs text-muted-foreground">({cliente.nome})</div>
                )}
              </td>
              <td className="p-3">{formatCpfCnpj(cliente.cpfCnpj)}</td>
              <td className="p-3 hidden md:table-cell">{cliente.email}</td>
              <td className="p-3 hidden md:table-cell">{formatDate(cliente.dataNascimento)}</td>
              <td className="p-3 text-right font-medium">{formatCurrency(cliente.patrimonio)}</td>
              <td className="p-3 text-center">
                <button 
                  className="text-primary hover:text-primary/70 transition-colors focus:outline-none"
                  aria-label={`Ver detalhes de ${cliente.nome}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClientSelect(cliente);
                  }}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
