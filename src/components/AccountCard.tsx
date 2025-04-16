
import React from 'react';
import { Conta } from '../types';
import { ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react';
import { formatCurrency } from '../lib/api';

interface AccountCardProps {
  conta: Conta;
}

/**
 * Componente que exibe os detalhes de uma conta bancária
 */
const AccountCard: React.FC<AccountCardProps> = ({ conta }) => {
  const isPositive = conta.saldo >= 0;
  
  // Define cores com base no saldo da conta
  const getSaldoColor = () => {
    if (isPositive) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <div className="border rounded-lg p-4 transition-all hover:shadow-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <h3 className="font-medium capitalize">Conta {conta.tipo}</h3>
        </div>
        <span className="text-xs bg-secondary px-2 py-1 rounded-full">
          ID: {conta.id}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-sm text-muted-foreground">Saldo</span>
          <div className="flex items-center">
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
            )}
            <span className={`font-semibold ${getSaldoColor()}`}>
              {formatCurrency(conta.saldo)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-sm text-muted-foreground">Limite de Crédito</span>
          <span className="font-medium">{formatCurrency(conta.limiteCredito)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Crédito Disponível</span>
          <span className="font-medium">{formatCurrency(conta.creditoDisponivel)}</span>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
