import { useState } from 'react';
import toast from 'react-hot-toast';
import { useProductContext } from '../context/ProductContext';
import { Product } from '../types/product';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDrawer({ isOpen, onClose }: DrawerProps) {
  const { setProducts } = useProductContext();

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    nome: '',
    categoria: '',
    preco: 0,
    descricao: '',
    imagem: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'preco' ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      ...formData,
      id: Date.now(),
    };

    setProducts((prev) => [...prev, newProduct]);
    toast.success('Produto cadastrado com sucesso!');
    onClose();
    setFormData({
      nome: '',
      categoria: '',
      preco: 0,
      descricao: '',
      imagem: '',
    });
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Cadastrar Produto</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <input
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço
              </label>
              <input
                type="number"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL da Imagem
              </label>
              <input
                type="url"
                name="imagem"
                value={formData.imagem}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
