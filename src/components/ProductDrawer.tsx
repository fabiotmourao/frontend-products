import { useState } from 'react';
import toast from 'react-hot-toast';
import { useProductContext } from '../context/ProductContext';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDrawer({ isOpen, onClose }: DrawerProps) {
  const { setProducts } = useProductContext();

  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    preco: '',
    descricao: '',
    imagem: '',
  });

  const [imagemPreview, setImagemPreview] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [useManualUrl, setUseManualUrl] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagemPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nome, categoria, preco, descricao, imagem } = formData;

    if (!nome || !categoria || !preco || !descricao || (!uploadFile && !imagem)) {
      toast.error('Preencha todos os campos!');
      return;
    }

    if (nome.length < 2 || categoria.length < 2 || descricao.length < 5) {
      toast.error('Todos os campos devem ter um tamanho mínimo válido.');
      return;
    }

    const precoValid = /^\d+(\.\d{1,2})?$/.test(preco);
    if (!precoValid) {
      toast.error('Preço deve ser um número decimal válido.');
      return;
    }

    const novoProduto = {
      id: Date.now(),
      nome,
      categoria,
      preco: parseFloat(preco),
      descricao,
      imagem: uploadFile ? imagemPreview : imagem,
    };

    setProducts(prev => [novoProduto, ...prev]);
    toast.success('Produto cadastrado com sucesso!');
    setFormData({ nome: '', categoria: '', preco: '', descricao: '', imagem: '' });
    setUploadFile(null);
    setImagemPreview('');
    setUseManualUrl(false);
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Novo Produto</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-xl">×</button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {['nome', 'categoria', 'preco', 'descricao'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
            {field !== 'descricao' ? (
              <input
                type={field === 'preco' ? 'number' : 'text'}
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            ) : (
              <textarea
                name={field}
                value={formData.descricao}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">Imagem do Produto</label>

          <div className="flex items-center gap-4 mb-2">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                checked={!useManualUrl}
                onChange={() => setUseManualUrl(false)}
              />
              Upload
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                checked={useManualUrl}
                onChange={() => setUseManualUrl(true)}
              />
              URL manual
            </label>
          </div>

          {!useManualUrl ? (
            <>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
              {imagemPreview && (
                <img
                  src={imagemPreview}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded"
                />
              )}
            </>
          ) : (
            <input
              type="text"
              name="imagem"
              value={formData.imagem}
              onChange={handleChange}
              placeholder="Ex: /images/exemplo.jpg"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
