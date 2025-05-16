import React from 'react';
import { Product } from '../types/product';
import ProductImage from './ProductImage';

interface ProductTableProps {
  products: Product[];
  sortField: keyof Product | '';
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  sortField,
  sortDirection,
  onSort,
}) => {
  const renderSortIcon = (field: keyof Product) => {
    if (sortField !== field) return '⇅';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-4 py-3">Foto</th>
            <th
              className="px-4 py-3 cursor-pointer"
              onClick={() => onSort('nome')}
            >
              Produto {renderSortIcon('nome')}
            </th>
            <th
              className="px-4 py-3 cursor-pointer"
              onClick={() => onSort('categoria')}
            >
              Categoria {renderSortIcon('categoria')}
            </th>
            <th
              className="px-4 py-3 cursor-pointer"
              onClick={() => onSort('preco')}
            >
              Preço {renderSortIcon('preco')}
            </th>
            <th
              className="px-4 py-3 cursor-pointer"
              onClick={() => onSort('descricao')}
            >
              Descrição {renderSortIcon('descricao')}
            </th>
            <th className="px-4 py-3">URL da Imagem</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t hover:bg-gray-50 transition-all">
              <td className="px-4 py-2">
                <ProductImage src={product.imagem} alt={product.nome} />
              </td>
              <td className="px-4 py-2 font-semibold text-gray-800">{product.nome}</td>
              <td className="px-4 py-2">{product.categoria}</td>
              <td className="px-4 py-2 font-medium text-gray-900">
                R$ {product.preco.toFixed(2)}
              </td>
              <td className="px-4 py-2 text-gray-600 max-w-[200px] truncate">
                {product.descricao}
              </td>
              <td className="px-4 py-2 text-blue-600 underline break-all max-w-[200px] truncate">
                {product.imagem}
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                Nenhum produto encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}; 