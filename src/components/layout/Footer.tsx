import { Instagram, Facebook, Youtube, CreditCard, Truck, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Institucional */}
          <div>
            <h4 className="font-bold text-lg mb-4">Institucional</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Sobre a ✿ Essenza Rosa ✿</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Trabalhe Conosco</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
          
          {/* Ajuda */}
          <div>
            <h4 className="font-bold text-lg mb-4">Ajuda</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Central de Atendimento</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Entregas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">Formas de Pagamento</a></li>
            </ul>
          </div>
          
          {/* Redes Sociais */}
          <div>
            <h4 className="font-bold text-lg mb-4">Redes Sociais</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors flex items-center gap-2">
                  <Instagram size={18} /> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors flex items-center gap-2">
                  <Facebook size={18} /> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors flex items-center gap-2">
                  <Youtube size={18} /> YouTube
                </a>
              </li>
            </ul>
          </div>
          
          {/* Segurança e Pagamento */}
          <div>
            <h4 className="font-bold text-lg mb-4">Segurança e Pagamento</h4>
            <div className="flex gap-3 mb-4">
              <CreditCard className="text-gray-400 w-8 h-8" />
              <Truck className="text-gray-400 w-8 h-8" />
              <Shield className="text-gray-400 w-8 h-8" />
            </div>
            <p className="text-xs text-gray-500">
              Compra 100% segura com certificado SSL
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2024 Época Cosméticos - Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;