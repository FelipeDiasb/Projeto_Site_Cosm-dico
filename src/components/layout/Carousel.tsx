import { useState, useEffect } from 'react';
import { Truck, Smartphone, Gift, Percent, CreditCard } from 'lucide-react';

interface Message {
  id: number;
  icon: React.ElementType;
  text: string;
  highlight?: string;
  extra?: string;
}

const messages: Message[] = [
  { id: 1, icon: Truck, text: 'FRETE GRÁTIS a partir de', highlight: 'R$ 179,00*' },
  { id: 2, icon: Smartphone, text: 'FRETE GRÁTIS no APP a partir de', highlight: 'R$ 99,00', extra: '+ brindes' },
  { id: 3, icon: Gift, text: 'BRINDE EXCLUSIVO nas compras acima de', highlight: 'R$ 150,00' },
  { id: 4, icon: Percent, text: '10% OFF na primeira compra no APP' },
  { id: 5, icon: CreditCard, text: 'PARCELE EM ATÉ 6X SEM JUROS' },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
      <div className="container-custom py-2">
        <div className="relative h-10 overflow-hidden">
          {messages.map((message, index) => {
            const Icon = message.icon;
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + messages.length) % messages.length;
            
            return (
              <div
                key={message.id}
                className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 ease-in-out ${
                  isActive 
                    ? 'opacity-100 translate-y-0' 
                    : isPrev
                      ? 'opacity-0 -translate-y-full'
                      : 'opacity-0 translate-y-full'
                }`}
              >
                <Icon className="text-primary w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 text-center">
                  {message.text}{' '}
                  {message.highlight && (
                    <strong className="font-bold text-primary">{message.highlight}</strong>
                  )}
                  {message.extra && (
                    <span className="font-medium text-gray-600"> {message.extra}</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;