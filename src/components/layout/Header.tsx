import { useState, useEffect, useRef } from 'react';
import { MapPin, User, Heart, ShoppingBag, Search, Menu, X, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import Carousel from './Carousel';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Menu items - você pode adicionar quantos quiser
  const menuItems = [
    { 
      name: 'LANÇAMENTOS',
      submenu: null
    },
    { 
      name: 'PRESENTES',
      submenu: null
    },
    { 
      name: 'MAQUIAGEM',
      submenu: ['Base', 'Batom', 'Sombra', 'Blush', 'Corretivo', 'Máscara de Cílios', 'Delineador', 'Pó Facial']
    },
    { 
      name: 'SKINCARE',
      submenu: ['Limpeza', 'Hidratação', 'Protetor Solar', 'Sérum', 'Máscaras Faciais', 'Óleos Faciais']
    },
    { 
      name: 'PERFUMES',
      submenu: [
        'Perfumaria Feminina',
        'Perfumaria Masculina',
        'Body Splash',
        'Perfumaria Infantil',
        'Perfumaria Unissex',
        'Perfumaria para Casa',
        'Kits',
        'Pocket Size',
        'Veganos',
        'Universo da Perfumaria',
        'Família Olfativa',
        'Amadeirado',
        'Aromático',
        'Chipre',
        'Cítrico',
        'Floral',
        'Frutal',
        'Oriental',
        'Descubra sua Fragrância',
        'Perfume',
        'Eau de Parfum',
        'Colônia'
      ]
    },
    { 
      name: 'CABELOS',
      submenu: ['Shampoo', 'Condicionador', 'Máscara Capilar', 'Óleos', 'Finalizadores', 'Tratamentos']
    },
    { 
      name: 'MARCAS',
      submenu: ['MAC', 'NARS', 'Dior', 'Lancôme', 'Época', 'Natura', 'O Boticário']
    },
    { 
      name: 'PROMOÇÕES',
      submenu: ['Ofertas do Dia', 'Queima de Estoque', 'Compre 2 Leve 3', 'Frete Grátis']
    },
    { 
      name: 'FRAGRÂNCIAS',
      submenu: ['Floral', 'Amadeirado', 'Cítrico', 'Oriental', 'Aromático', 'Frutal']
    },
    { 
      name: 'MASCULINO',
      submenu: null
    },
    { 
      name: 'CASA',
      submenu: null
    },
    { 
      name: 'CORPO E BANHO',
      submenu: ['Hidratantes', 'Óleos Corporais', 'Sabonetes', 'Esfoliantes', 'Manteigas']
    }
  ];
useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkScrollButtons = () => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const handleMouseEnter = (itemName: string) => {
    console.log('Mouse entrou em:', itemName); // Para debug
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
     console.log('Mouse saiu'); // Para debug
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>
      <Carousel />

      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {/* logo */}
          </div>
          {/* Elemento decorativo com gradiente animado */}
          <div className="hidden md:block">
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent font-semibold text-3xl tracking-wide">
              ✿ Essenza Rosa ✿
            </span>
          </div>

          {/* Busca */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="O que você está buscando?"
                className="w-full px-4 py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
              <MapPin className="text-primary w-5 h-5" />
              <div className="text-sm">
                <p className="text-gray-400 text-xs">informe seu CEP</p>
                <p className="font-semibold text-gray-800">Localização</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
              <User className="text-primary w-5 h-5" />
              <div className="text-sm">
                <p className="text-gray-400 text-xs">Olá! Entrar</p>
                <p className="font-semibold text-gray-800">Minha Conta</p>
              </div>
            </div>

            <a href="#" className="hidden md:flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-sm">Favoritos</span>
            </a>

            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-sm hidden md:inline">Sua Sacola</span>
            </a>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50 animate-fade-in max-h-[80vh] overflow-y-auto">
          <nav className="container-custom py-4">
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <div className="flex justify-between items-center py-2 text-gray-700">
                    <a href="#" className="hover:text-primary transition-colors">
                      {item.name}
                    </a>
                    {item.submenu && (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </div>
                  {item.submenu && (
                    <ul className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                      {item.submenu.map((sub) => (
                        <li key={sub}>
                          <a href="#" className="block py-1 text-sm text-gray-500 hover:text-primary transition-colors">
                            {sub}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Menu desktop com scroll horizontal e submenu dropdown */}
      <nav className="hidden lg:block border-t border-gray-100 relative">
        <div className="container-custom relative">
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          )}

          <ul
            ref={navRef}
            className="flex gap-8 py-3 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={checkScrollButtons}
          >
            {menuItems.map((item) => (
              <li 
                key={item.name} 
                className="relative flex-shrink-0 group"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <a 
                  href="#" 
                  className="relative text-sm font-medium text-gray-700 hover:text-primary transition-colors whitespace-nowrap py-2 block"
                >
                  {item.name}
                  {/* Linha rosa gradiente no hover */}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></span>
                </a>
                
                {/* Submenu dropdown */}

                {/* Submenu dropdown */}
                {item.submenu && activeDropdown === item.name && (
                  <div 
                    className="absolute top-full mt-2 bg-white shadow-xl rounded-lg border border-gray-100 min-w-[320px] z-[1100]"
                    style={{ 
                      animation: 'fadeIn 0.2s ease-out',
                      left: '0',
                      right: 'auto',
                      backgroundColor: 'white'
                    }}
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-bold text-primary mb-3 border-b border-gray-200 pb-2">
                        {item.name}
                      </h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {item.submenu.map((sub) => (
                          <a
                            key={sub}
                            href="#"
                            className="text-sm text-gray-600 hover:text-primary transition-colors py-1.5 block"
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;