import React from 'react';

interface ProductFiltersProps {
  search: string;
  minPrice: string;
  maxPrice: string;
  onSearchChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  search,
  minPrice,
  maxPrice,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-end mb-6 bg-white p-4 rounded shadow">
      <div className="flex flex-col">
        <label className="text-sm font-medium">Buscar por nome</label>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="Ex: Monitor"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Preço mínimo</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="0.00"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Preço máximo</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="9999.99"
        />
      </div>
    </div>
  );
}; 