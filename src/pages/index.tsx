import { useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import { Product } from '../types/product';
import ProductDrawer from '../components/ProductDrawer';
import { Header } from '../components/Header';
import { ProductFilters } from '../components/ProductFilters';
import { ProductTable } from '../components/ProductTable';
import { Pagination } from '../components/Pagination';

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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      <Header onOpenDrawer={() => setIsDrawerOpen(true)} />
      
      <ProductFilters
        search={search}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onSearchChange={handleSearchChange}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
      />

      <ProductTable
        products={currentProducts}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ProductDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}
