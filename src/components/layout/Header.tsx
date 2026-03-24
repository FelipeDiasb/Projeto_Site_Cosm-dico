import { useState, useEffect } from 'react';
import { MapPin, User, Heart, ShoppingBag, Search, Menu, X } from 'lucide-react';
import Carousel from './Carousel';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>
      {/* Carrossel de mensagens */}
      <Carousel />
      
      {/* Header principal */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Logo e Menu Mobile */}
          <div className="flex items-center gap-2">
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <a href="/" className="text-2xl font-bold">
              <span className="text-primary">Época</span>
              <span className="text-gray-800"> Cosméticos</span>
            </a>
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
          
          {/* Ícones */}
          <div className="flex items-center gap-4">
            {/* Localização */}
            <div className="hidden md:flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
              <MapPin className="text-primary w-5 h-5" />
              <div className="text-sm">
                <p className="text-gray-400 text-xs">informe seu CEP</p>
                <p className="font-semibold text-gray-800">Localização</p>
              </div>
            </div>
            
            {/* Usuário */}
            <div className="hidden md:flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
              <User className="text-primary w-5 h-5" />
              <div className="text-sm">
                <p className="text-gray-400 text-xs">Olá! Entrar</p>
                <p className="font-semibold text-gray-800">Minha Conta</p>
              </div>
            </div>
            
            {/* Favoritos */}
            <a href="#" className="hidden md:flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-sm">Favoritos</span>
            </a>
            
            {/* Carrinho */}
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-sm hidden md:inline">Sua Sacola</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50 animate-fade-in">
          <nav className="container-custom py-4">
            <ul className="space-y-3">
              <li><a href="#" className="block py-2 text-gray-700 hover:text-primary transition-colors">LANÇAMENTOS</a></li>
              <li><a href="#" className="block py-2 text-gray-700 hover:text-primary transition-colors">MAQUIAGEM</a></li>
              <li><a href="#" className="block py-2 text-gray-700 hover:text-primary transition-colors">SKINCARE</a></li>
              <li><a href="#" className="block py-2 text-gray-700 hover:text-primary transition-colors">PERFUMES</a></li>
              <li><a href="#" className="block py-2 text-gray-700 hover:text-primary transition-colors">CABELOS</a></li>
              <li><a href="#" className="block py-2 text-gray-700 hover:text-primary transition-colors">MARCAS</a></li>
              <li><a href="#" className="block py-2 text-gray-700 hover:text-primary transition-colors">PROMOÇÕES</a></li>
            </ul>
          </nav>
        </div>
      )}
      
      {/* Menu desktop */}
      <nav className="hidden lg:block border-t border-gray-100">
        <div className="container-custom">
          <ul className="flex gap-8 py-3">
            <li><a href="#" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">LANÇAMENTOS</a></li>
            <li><a href="#" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">MAQUIAGEM</a></li>
            <li><a href="#" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">SKINCARE</a></li>
            <li><a href="#" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">PERFUMES</a></li>
            <li><a href="#" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">CABELOS</a></li>
            <li><a href="#" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">MARCAS</a></li>
            <li><a href="#" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">PROMOÇÕES</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;