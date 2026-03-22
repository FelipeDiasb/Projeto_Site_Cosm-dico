document.addEventListener('DOMContentLoaded', function() {
    // ========== CARROSSEL DE MENSAGENS DO TOPO ==========
    const messages = document.querySelectorAll('.message');
    let currentIndex = 0;
    let intervalId;
    
    function showMessage(index) {
        // Remove classes de todos os messages
        messages.forEach(msg => {
            msg.classList.remove('active', 'prev');
        });
        
        // Adiciona classe active no message atual
        messages[index].classList.add('active');
        
        // Calcula o índice anterior para animação de saída
        const prevIndex = index === 0 ? messages.length - 1 : index - 1;
        messages[prevIndex].classList.add('prev');
    }
    
    function nextMessage() {
        currentIndex = (currentIndex + 1) % messages.length;
        showMessage(currentIndex);
    }
    
    function startCarousel() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextMessage, 4000); // Troca a cada 4 segundos
    }
    
    function stopCarousel() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    
    // Inicia o carrossel
    if (messages.length > 0) {
        startCarousel();
        
        // Pausa o carrossel quando o mouse está sobre ele (opcional)
        const carousel = document.querySelector('.top-messages-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopCarousel);
            carousel.addEventListener('mouseleave', startCarousel);
            
            // Para dispositivos touch
            carousel.addEventListener('touchstart', stopCarousel);
            carousel.addEventListener('touchend', startCarousel);
        }
    }
    
    // ========== HEADER FIXO COM SOMBRA DINÂMICA ==========
    const header = document.querySelector('.header');
    
    function handleHeaderShadow() {
        if (window.scrollY > 10) {
            header.classList.add('header-shadow');
        } else {
            header.classList.remove('header-shadow');
        }
    }
    
    handleHeaderShadow();
    window.addEventListener('scroll', handleHeaderShadow);
    
    // ========== SIMULAÇÃO DE ADICIONAR AO CARRINHO ==========
    const addButtons = document.querySelectorAll('.btn-add');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const product = this.closest('.product-card');
            const productName = product.querySelector('.product-title').innerText;
            const originalText = this.textContent;
            
            this.textContent = '✓ Adicionado!';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '#ff6b6b';
            }, 1500);
            
            console.log(`Produto adicionado: ${productName}`);
        });
    });
    
    // ========== FILTROS (SIMULAÇÃO) ==========
    const checkboxes = document.querySelectorAll('.filter-section input[type="checkbox"]');
    const priceRange = document.querySelector('.price-range input');
    const priceValueDisplay = document.querySelector('.price-values span:first-child');
    
    if (priceRange && priceValueDisplay) {
        priceRange.addEventListener('input', function() {
            priceValueDisplay.textContent = `R$ ${this.value}`;
        });
    }
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log('Filtro aplicado (simulação)');
        });
    });
    
    // ========== BUSCA (SIMULAÇÃO) ==========
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    const handleSearch = () => {
        const term = searchInput.value.trim();
        if (term) {
            alert(`Você buscou por: "${term}"\n(Esta é uma simulação - integração com backend necessária)`);
        } else {
            alert('Digite um termo para buscar');
        }
    };

    
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    // ========== INTERAÇÃO COM LOCALIZAÇÃO/CEP ==========
const locationInfo = document.querySelector('.location-info');

if (locationInfo) {
    locationInfo.addEventListener('click', function() {
        // Simulação de modal/popup para informar CEP
        const cep = prompt('Informe seu CEP para verificar o prazo de entrega:', '00000-000');
        
        if (cep && cep.length >= 8) {
            // Simulação de validação
            const formattedCep = cep.replace(/\D/g, '');
            if (formattedCep.length === 8) {
                const locationValue = document.querySelector('.location-value');
                if (locationValue) {
                    locationValue.textContent = 'CEP ' + formattedCep.substring(0,5) + '-' + formattedCep.substring(5);
                    locationInfo.classList.add('cep-filled');
                }
                alert(`CEP ${formattedCep} registrado! Você verá os prazos de entrega nos produtos.`);
            } else {
                alert('Por favor, informe um CEP válido com 8 dígitos.');
            }
        } else if (cep && cep.length > 0 && cep.length < 8) {
            alert('Por favor, informe um CEP válido com 8 dígitos.');
        }
    });
}
// ========== INTERAÇÃO COM BLOCO DO USUÁRIO ==========
const userInfo = document.querySelector('.user-info');

if (userInfo) {
    userInfo.addEventListener('click', function() {
        // Simulação de redirecionamento para login
        alert('Redirecionando para página de login...\n(Esta é uma simulação)');
        // window.location.href = "/login"; // Descomente para redirecionar
    });
}
    // ========== SCROLL SUAVE PARA ÂNCORAS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== "#" && href !== "") {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 120;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
    
    console.log('Site carregado com carrossel de mensagens no topo');
});
    
    // ========== MENU HAMBURGUER PARA MOBILE (OPCIONAL) ==========
    // Você pode adicionar um botão hamburguer no HTML depois
    console.log('Site carregado com header fixo e sticky filters');
