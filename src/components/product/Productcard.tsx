import { ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/formatPrice';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
            {product.badge}
          </span>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase mb-1">{product.brand}</p>
        <h3 className="text-sm font-medium mb-2 line-clamp-2 min-h-[40px]">{product.name}</h3>
        
        <div className="mb-2">
          {product.comparePrice && (
            <span className="text-xs text-gray-400 line-through mr-2">
              {formatPrice(product.comparePrice)}
            </span>
          )}
          <span className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
        </div>
        
        {product.installment && (
          <p className="text-xs text-gray-500 mb-3">{product.installment}</p>
        )}
        
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          Adicionar à sacola
        </button>
      </div>
    </div>
  );
};

export default ProductCard;