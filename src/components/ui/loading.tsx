
import React from 'react';

interface LoadingProps {
  message?: string;
}

/**
 * Componente para exibir um estado de carregamento
 * @param message Mensagem opcional para exibir durante o carregamento
 */
export const Loading: React.FC<LoadingProps> = ({ message = "Carregando dados..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-primary animate-spin-slow"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-primary opacity-30"></div>
      </div>
      <p className="text-muted-foreground text-lg animate-pulse">{message}</p>
    </div>
  );
};

export default Loading;
