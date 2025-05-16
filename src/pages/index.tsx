import { useState } from 'react';
import ProductImage from '../components/ProductImage';
import { useProductContext } from '../context/ProductContext';
import { Product } from '../types/product';
import ProductDrawer from '../components/ProductDrawer';

export default function Home() {
  const { products } = useProductContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filtros
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Ordenação por cabeçalho
  const [sortField, setSortField] = useState<keyof Product | ''>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (field: keyof Product) => {
    if (sortField !== field) return '⇅';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  // Filtro aplicado
  let filteredProducts = products.filter((product) => {
    const matchName = product.nome.toLowerCase().includes(search.toLowerCase());
    const matchMin = minPrice === '' || product.preco >= parseFloat(minPrice);
    const matchMax = maxPrice === '' || product.preco <= parseFloat(maxPrice);
    return matchName && matchMin && matchMax;
  });

  // Ordenação
  if (sortField) {
    filteredProducts = filteredProducts.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }

  // Paginação
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Produtos</h1>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Cadastrar Produto
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-end mb-6 bg-white p-4 rounded shadow">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Buscar por nome</label>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 py-2"
            placeholder="Ex: Monitor"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Preço mínimo</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 py-2"
            placeholder="0.00"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Preço máximo</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 py-2"
            placeholder="9999.99"
          />
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-3">Imagem</th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort('nome')}
              >
                Produto {renderSortIcon('nome')}
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort('categoria')}
              >
                Categoria {renderSortIcon('categoria')}
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort('preco')}
              >
                Preço {renderSortIcon('preco')}
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort('descricao')}
              >
                Descrição {renderSortIcon('descricao')}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product: Product) => (
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
              </tr>
            ))}
            {currentProducts.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex justify-center mt-6">
        <nav className="flex items-center space-x-1 text-sm text-gray-700">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            ← Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => changePage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'text-blue-600 underline' : 'hover:bg-gray-100'
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Próximo →
          </button>
        </nav>
      </div>

      {/* Modal de Cadastro */}
      <ProductDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}
