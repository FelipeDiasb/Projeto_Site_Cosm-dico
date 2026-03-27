import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, User, Heart, ShoppingBag, Search, Menu, X, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import Carousel from './Carousel';

interface DropdownMeta {
  name: string;
  top: number;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [dropdownMeta, setDropdownMeta] = useState<DropdownMeta | null>(null);

  const navRef = useRef<HTMLUListElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Menu items com submenus completos
  const menuItems = [
    { name: 'LANÇAMENTOS', submenu: null },
    { 
      name: 'PRESENTES', 
      submenu: [
        { title: 'Destaques', items: ['Todos os presentes', 'Presentes para o Dia das Mães', 'Escolha o presente perfeito', 'Monte seu Presente'] },
        { title: 'Ocasiões', items: ['Presentes de Aniversário', 'Presentes de Agradecimento', 'Presentes para Casa', 'Presente para o Dia dos Pais', 'Presente para o Dia das Crianças', 'Presentes para o Natal'] },
        { title: 'Por Faixa de Preço', items: ['Até 50 Reais', 'Até 100 Reais', 'Até 160 Reais', 'Até 200 Reais', 'Acima de 200 Reais'] },
        { title: 'Kits para Presente', items: ['Kits Masculinos', 'Kits Femininos', 'Kits Infantis'] },
        { title: 'Para Quem?', items: ['Presentes Masculinos', 'Presentes Femininos', 'Presentes Adolescente', 'Presentes Criança', 'Presentes Bebê'] },
        { title: 'Especiais', items: ['QUIZ: Encontre o presente ideal', 'Vale-Presente e Experiência'] }
      ]
    },
    {
      name: 'MAQUIAGEM',
      submenu: [
        { title: 'Categorias', items: ['Base', 'Batom', 'Sombra', 'Blush', 'Corretivo', 'Máscara de Cílios', 'Delineador', 'Pó Facial'] }
      ]
    },
    {
      name: 'SKINCARE',
      submenu: [
        { title: 'Cuidados', items: ['Limpeza', 'Hidratação', 'Protetor Solar', 'Sérum', 'Máscaras Faciais', 'Óleos Faciais'] }
      ]
    },
    {
      name: 'PERFUMES',
      submenu: [
        { title: 'Perfumaria', items: ['Perfumaria Feminina', 'Perfumaria Masculina', 'Body Splash', 'Perfumaria Infantil', 'Perfumaria Unissex', 'Perfumaria para Casa'] },
        { title: 'Kits e Tamanhos', items: ['Kits', 'Pocket Size', 'Veganos'] },
        { title: 'Universo Olfativo', items: ['Universo da Perfumaria', 'Família Olfativa', 'Amadeirado', 'Aromático', 'Chipre', 'Cítrico', 'Floral', 'Frutal', 'Oriental'] },
        { title: 'Descubra', items: ['Descubra sua Fragrância', 'Perfume', 'Eau de Parfum', 'Colônia'] }
      ]
    },
    {
      name: 'CABELOS',
      submenu: [
        { title: 'Cuidados', items: ['Shampoo', 'Condicionador', 'Máscara Capilar', 'Óleos', 'Finalizadores', 'Tratamentos'] }
      ]
    },
    {
      name: 'MARCAS',
      submenu: [
        { title: 'Nossas Marcas', items: ['MAC', 'NARS', 'Dior', 'Lancôme', 'Época', 'Natura', 'O Boticário'] }
      ]
    },
    {
      name: 'PROMOÇÕES',
      submenu: [
        { title: 'Ofertas', items: ['Ofertas do Dia', 'Queima de Estoque', 'Compre 2 Leve 3', 'Frete Grátis'] },
        { title: 'Produtos em Promoção', items: ['Leve 3, Pague 2', 'Desconto Progressivo', 'Mais vendidos', 'Termos e Condições'] },
        { title: 'Cupons de Desconto', items: ['Todos os cupons', '1ª Compra com Desconto'] },
        { title: 'Fidelidade', items: ['Promoções ', 'Personalizadas', 'Promoções Fidelidade'] },
        { title: 'Promos por Categoria', items: ['Promoção em Perfumaria', 'Promoção em Corpo e Banho', 'Promoção em Cabelos', 'Promoção em Maquiagem','Promoção em Skincare'] }
      ]


    },
    {
      name: 'FRAGRÂNCIAS',
      submenu: [
        { title: 'Famílias', items: ['Floral', 'Amadeirado', 'Cítrico', 'Oriental', 'Aromático', 'Frutal'] }
      ]
    },
    { name: 'MASCULINO', submenu: null },
    { name: 'CASA', submenu: null },
    {
      name: 'CORPO E BANHO',
      submenu: [
        { title: 'Produtos', items: ['Hidratantes', 'Óleos Corporais', 'Sabonetes', 'Esfoliantes', 'Manteigas'] }
      ]
    },
  ];

  // Função para organizar submenu em colunas (para itens simples)
  const organizeSubmenuIntoColumns = (items: string[], maxRows: number = 10) => {
    const numColumns = Math.ceil(items.length / maxRows);
    const columns: string[][] = [];
    
    for (let i = 0; i < numColumns; i++) {
      columns.push(items.slice(i * maxRows, (i + 1) * maxRows));
    }
    
    return columns;
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkScrollButtons = useCallback(() => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [checkScrollButtons]);

  useEffect(() => {
    const handlePageScroll = () => setDropdownMeta(null);
    window.addEventListener('scroll', handlePageScroll);
    return () => window.removeEventListener('scroll', handlePageScroll);
  }, []);

  const scrollLeft = () => {
    navRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
    setTimeout(checkScrollButtons, 300);
  };

  const scrollRight = () => {
    navRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
    setTimeout(checkScrollButtons, 300);
  };

  const handleMouseEnter = (itemName: string, itemEl: HTMLElement) => {
  if (dropdownTimeoutRef.current) {
    clearTimeout(dropdownTimeoutRef.current);
  }

    const rect = itemEl.getBoundingClientRect();
    const headerRect = document.querySelector('header')?.getBoundingClientRect();
  
  setDropdownMeta({
    name: itemName,
    top: rect.bottom + 4,
  });
};

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownMeta(null);
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  const activeItem = menuItems.find((item) => item.name === dropdownMeta?.name);

  // Verifica se o submenu é do tipo categorizado (com títulos)
  const isCategorizedSubmenu = (submenu: any): submenu is { title: string; items: string[] }[] => {
    return Array.isArray(submenu) && submenu.length > 0 && 'title' in submenu[0];
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
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
          </div>

          <div className="hidden md:block">
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent font-semibold text-3xl tracking-wide">
              ✿ Essenza Rosa ✿
            </span>
          </div>

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
                    {item.submenu && <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                  {item.submenu && (
                    <ul className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                      {isCategorizedSubmenu(item.submenu) ? (
                        item.submenu.map((category) => (
                          <li key={category.title}>
                            <span className="font-semibold text-gray-600 text-sm">{category.title}</span>
                            <ul className="pl-2 mt-1 space-y-1">
                              {category.items.map((sub) => (
                                <li key={sub}>
                                  <a href="#" className="block py-1 text-sm text-gray-500 hover:text-primary transition-colors">
                                    {sub}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))
                      ) : (
                        (item.submenu as string[]).map((sub) => (
                          <li key={sub}>
                            <a href="#" className="block py-1 text-sm text-gray-500 hover:text-primary transition-colors">
                              {sub}
                            </a>
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Menu desktop */}
      <nav className="hidden lg:block border-t border-gray-100">
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
            className="flex gap-8 py-3 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={checkScrollButtons}
          >
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="relative flex-shrink-0 group"
                onMouseEnter={(e) => item.submenu && handleMouseEnter(item.name, e.currentTarget)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href="#"
                  className="relative text-sm font-medium text-gray-700 hover:text-primary transition-colors whitespace-nowrap py-2 block"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

    {/* ✅ MEGA MENU - alinhado com o container do header (mesma largura) */}
{dropdownMeta && activeItem?.submenu && (
  <div
    className="absolute bg-white shadow-2xl rounded-lg border border-gray-100 z-[9999]"
    style={{
      top: `${dropdownMeta.top}px`,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '1280px', // mesma largura do container-custom
      animation: 'fadeIn 0.15s ease-out',
    }}
    onMouseEnter={handleDropdownMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <div className="py-8 px-4 sm:px-6 lg:px-8">
            {/* Layout em colunas responsivo */}
            {isCategorizedSubmenu(activeItem.submenu) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {activeItem.submenu.map((category) => (
                  <div key={category.title} className="flex flex-col">
                    <h5 className="font-semibold text-primary text-sm mb-2 border-l-2 border-pink-400 pl-2">
                      {category.title}
                    </h5>
                    <div className="flex flex-col gap-0.5">
                      {category.items.map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="text-sm text-gray-600 hover:text-primary hover:bg-pink-50 transition-all duration-200 py-1 px-2 rounded-lg block"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-6">
                {(() => {
                  const items = activeItem.submenu as string[];
                  const columns = organizeSubmenuIntoColumns(items, 8);
                  return columns.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-0.5 min-w-[180px]">
                      {column.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          className="text-sm text-gray-600 hover:text-primary hover:bg-pink-50 transition-all duration-200 py-1 px-2 rounded-lg block"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  ));
                })()}
              </div>
            )}
            
            {/* Rodapé do menu apenas para PRESENTES */}
            {activeItem.name === 'PRESENTES' && (
              <div className="mt-5 pt-3 border-t border-gray-100">
                <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
                  Ver todos os presentes
                  <ChevronRight size={16} />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;