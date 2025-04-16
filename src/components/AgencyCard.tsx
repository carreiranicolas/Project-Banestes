
import React from 'react';
import { Agencia } from '../types';
import { MapPin, Building } from 'lucide-react';

interface AgencyCardProps {
  agencia: Agencia;
  className?: string;
}

/**
 * Componente que exibe os detalhes de uma agência bancária
 */
const AgencyCard: React.FC<AgencyCardProps> = ({ agencia, className }) => {
  return (
    <div className={`rounded-lg border p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Building className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Agência {agencia.codigo}</h3>
        </div>
        <span className="text-xs bg-secondary px-2 py-1 rounded-full">
          ID: {agencia.id}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Nome da Agência</h4>
          <p>{agencia.nome}</p>
        </div>

        <div className="flex items-start space-x-2">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Endereço</h4>
            <p className="text-sm">{agencia.endereco}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyCard;
