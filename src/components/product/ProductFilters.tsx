import type { FilterState } from '../../types';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const categories = ['Base', 'Batom', 'Sombra', 'Blush', 'Corretivo', 'Máscara de Cílios'];
const brands = ['MAC', 'NARS', 'Dior', 'Lancôme', 'Época'];

const ProductFilters = ({ filters, onFilterChange }: ProductFiltersProps) => {
  const handleCategoryChange = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFilterChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleBrandChange = (brand: string) => {
    const updatedBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    onFilterChange({
      ...filters,
      brands: updatedBrands
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      priceRange: parseInt(e.target.value)
    });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      brands: [],
      priceRange: 250
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Filtrar por</h3>
        {(filters.categories.length > 0 || filters.brands.length > 0) && (
          <button
            onClick={clearFilters}
            className="text-xs text-primary hover:underline"
          >
            Limpar filtros
          </button>
        )}
      </div>
      
      {/* Categorias */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-3">Categorias</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Marcas */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-3">Marcas</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Preço */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Preço</h4>
        <input
          type="range"
          min="0"
          max="500"
          value={filters.priceRange}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>R$ 0</span>
          <span>R$ {filters.priceRange}</span>
          <span>R$ 500+</span>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;