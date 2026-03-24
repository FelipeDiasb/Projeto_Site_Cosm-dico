import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import type { Product, FilterState } from '../types';

// Dados mockados (depois vem do backend)
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Base Líquida Alta Cobertura',
    brand: 'Marca Exemplo',
    price: 71.92,
    comparePrice: 89.90,
    image: 'https://placehold.co/300x300/FFF0F0/FF69B4?text=Base',
    badge: '-20%',
    installment: 'ou 3x de R$ 23,97'
  },
  {
    id: '2',
    name: 'Batom Matte Vermelho',
    brand: 'Marca Exemplo',
    price: 45.90,
    image: 'https://placehold.co/300x300/FFF0F0/FF69B4?text=Batom',
    installment: 'ou 2x de R$ 22,95'
  },
  {
    id: '3',
    name: 'Blush em Pó Rosê',
    brand: 'Marca Exemplo',
    price: 62.90,
    image: 'https://placehold.co/300x300/FFF0F0/FF69B4?text=Blush',
    installment: 'ou 3x de R$ 20,97'
  },
  {
    id: '4',
    name: 'Paleta de Sombras Nude',
    brand: 'Marca Exemplo',
    price: 129.90,
    image: 'https://placehold.co/300x300/FFF0F0/FF69B4?text=Sombra',
    badge: 'Novo',
    installment: 'ou 4x de R$ 32,48'
  },
];

const Home = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: 250
  });

  const handleAddToCart = (product: Product) => {
    console.log('Adicionado ao carrinho:', product);
    alert(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container-custom py-8">
        {/* Título e descrição */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Maquiagem</h1>
          <p className="text-gray-600">
            A maquiagem é uma ferramenta incrível de expressão! Com ela, podemos transmitir sentimentos, 
            opiniões e atitudes, seja através de cores vibrantes ou tons neutros.
          </p>
        </div>
        
        {/* Layout com filtros e produtos */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters filters={filters} onFilterChange={setFilters} />
          </aside>
          
          <div className="lg:col-span-3">
            <ProductGrid products={products} onAddToCart={handleAddToCart} />
          </div>
        </div>
        
        {/* Conteúdo informativo */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Maquiagem na Época Cosméticos</h2>
          <p className="text-gray-600 mb-4">
            Seja uma maquiagem para o dia a dia, para festa ou para um momento especial, 
            fizemos uma seleção das melhores marcas e dicas de maquiagem para fazer você se sentir ainda mais bonita.
          </p>
          <h3 className="text-xl font-semibold mb-3">Como preparar a pele para maquiagem?</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Limpeza:</strong> Use um limpador suave para remover impurezas.</li>
            <li><strong>Esfoliação:</strong> Realize uma esfoliação suave 1-2 vezes por semana.</li>
            <li><strong>Hidratação:</strong> Aplique um hidratante adequado ao seu tipo de pele.</li>
            <li><strong>Protetor Solar:</strong> Nunca se esqueça do protetor solar!</li>
            <li><strong>Primer:</strong> Use um primer para preparar a pele.</li>
          </ul>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;