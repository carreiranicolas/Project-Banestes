
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Componente para exibir estados de erro
 * @param message Mensagem de erro para exibir
 * @param onRetry Função opcional para tentar novamente
 */
export const Error: React.FC<ErrorProps> = ({ message, onRetry }) => {
  return (
    <div className="rounded-lg border border-destructive p-6 text-center shadow-sm animate-fade-in">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Ocorreu um erro</h2>
      <p className="text-muted-foreground mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
};

export default Error;
