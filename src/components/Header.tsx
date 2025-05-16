import React from 'react';

interface HeaderProps {
  onOpenDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDrawer }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Gerenciamento de Produtos</h1>
      <button
        onClick={onOpenDrawer}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Cadastrar Produto
      </button>
    </div>
  );
}; 