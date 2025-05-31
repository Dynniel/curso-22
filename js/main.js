// Caminho da Prosperidade - Script Principal
// Desenvolvido para maximizar conversão e experiência do usuário

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização de componentes
    initCountdown();
    initStickyHeader();
    initStickyFooter();
    initFaqAccordion();
    initSmoothScroll();
    initPopups();
    initMobileMenu();
    initTestimonialSlider();
    initSocialProofNotifications();
    initExitIntent();
    initProgressTracking();
    
    // Adiciona classe para animações após carregamento
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 300);
});

// Contador regressivo
function initCountdown() {
    function updateCountdown() {
        // Define o tempo final (próxima meia-noite)
        const now = new Date();
        const hours = 23 - now.getHours();
        const minutes = 59 - now.getMinutes();
        const seconds = 59 - now.getSeconds();
        
        // Atualiza os elementos do contador
        const countdownElements = document.querySelectorAll('.countdown-number');
        countdownElements.forEach(element => {
            if (element.id.includes('hours')) {
                element.textContent = hours.toString().padStart(2, '0');
            } else if (element.id.includes('minutes')) {
                element.textContent = minutes.toString().padStart(2, '0');
            } else if (element.id.includes('seconds')) {
                element.textContent = seconds.toString().padStart(2, '0');
            }
        });
        
        // Efeito de pulsação quando segundos = 0
        if (seconds === 0) {
            document.querySelectorAll('.countdown-container').forEach(container => {
                container.classList.add('pulse');
                setTimeout(() => {
                    container.classList.remove('pulse');
                }, 1000);
            });
        }
    }
    
    // Atualiza a cada segundo
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Inicializa imediatamente
}

// Header fixo com efeito de redução ao rolar
function initStickyHeader() {
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adiciona classe quando rola para baixo
        if (scrollTop > headerHeight) {
            header.classList.add('sticky');
            
            // Esconde o header quando rola para baixo e mostra quando rola para cima
            if (scrollTop > lastScrollTop && scrollTop > headerHeight * 2) {
                header.classList.add('hide');
            } else {
                header.classList.remove('hide');
            }
        } else {
            header.classList.remove('sticky');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Footer fixo com CTA
function initStickyFooter() {
    const stickyCta = document.querySelector('.sticky-cta');
    const heroSection = document.querySelector('.hero');
    const footer = document.querySelector('footer');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const footerTop = footer.offsetTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Mostra o CTA fixo após a seção hero e esconde próximo ao footer
        if (scrollTop > heroBottom && scrollTop + windowHeight < footerTop) {
            stickyCta.classList.add('active');
        } else {
            stickyCta.classList.remove('active');
        }
        
        // Mostra popup de urgência quando o usuário está próximo do final da página
        if (scrollTop + windowHeight > documentHeight * 0.8) {
            showUrgencyPopup();
        }
    });
}

// Accordion para FAQ
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Fecha todos os itens
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Abre o item clicado se não estava ativo
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
                
                // Scroll suave até o item aberto
                setTimeout(() => {
                    question.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    });
}

// Scroll suave para links internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Ajusta o scroll considerando o header fixo
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Atualiza URL sem recarregar a página
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Popups e modais
function initPopups() {
    // Quiz popup
    const quizButton = document.getElementById('quiz-button');
    const quizPopup = document.getElementById('quiz-popup');
    const quizClose = document.getElementById('quiz-close');
    
    if (quizButton && quizPopup && quizClose) {
        quizButton.addEventListener('click', () => {
            quizPopup.classList.add('active');
            document.body.classList.add('popup-open');
        });
        
        quizClose.addEventListener('click', () => {
            quizPopup.classList.remove('active');
            document.body.classList.remove('popup-open');
        });
    }
    
    // Calculadora popup
    const calculatorPopup = document.getElementById('calculator-popup');
    const calculatorClose = document.getElementById('calculator-close');
    
    if (calculatorPopup && calculatorClose) {
        // Mostra após 40 segundos na página
        setTimeout(() => {
            calculatorPopup.classList.add('active');
            document.body.classList.add('popup-open');
        }, 40000);
        
        calculatorClose.addEventListener('click', () => {
            calculatorPopup.classList.remove('active');
            document.body.classList.remove('popup-open');
        });
    }
    
    // Fecha popups ao clicar fora
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quiz-popup') || e.target.classList.contains('calculator-popup')) {
            e.target.classList.remove('active');
            document.body.classList.remove('popup-open');
        }
    });
    
    // Previne propagação de cliques dentro dos popups
    document.querySelectorAll('.quiz-content, .calculator-content').forEach(content => {
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}

// Menu mobile
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
            
            // Alterna entre ícones de menu e fechar
            if (mobileMenuButton.classList.contains('active')) {
                mobileMenuButton.innerHTML = '✕';
            } else {
                mobileMenuButton.innerHTML = '☰';
            }
        });
        
        // Fecha menu ao clicar em um link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuButton.classList.remove('active');
                mobileMenuButton.innerHTML = '☰';
            });
        });
    }
}

// Slider de depoimentos
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // Eventos de mouse
        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialSlider.classList.add('active');
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialSlider.classList.remove('active');
        });
        
        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
            testimonialSlider.classList.remove('active');
        });
        
        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2; // Velocidade do scroll
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
        
        // Auto-scroll suave
        let scrollDirection = 1;
        let scrollSpeed = 0.5;
        
        function autoScroll() {
            if (!testimonialSlider.matches(':hover')) {
                testimonialSlider.scrollLeft += scrollDirection * scrollSpeed;
                
                // Inverte direção ao atingir os limites
                if (testimonialSlider.scrollLeft <= 0) {
                    scrollDirection = 1;
                } else if (testimonialSlider.scrollLeft >= testimonialSlider.scrollWidth - testimonialSlider.clientWidth) {
                    scrollDirection = -1;
                }
            }
            
            requestAnimationFrame(autoScroll);
        }
        
        autoScroll();
    }
}

// Notificações de prova social
function initSocialProofNotifications() {
    const notificationPopup = document.getElementById('notification-popup');
    const notifications = [
        '7 pessoas se inscreveram nos últimos 30 minutos',
        'Maria acabou de se inscrever no curso',
        'Apenas 7 vagas restantes para esta turma',
        'João avaliou o curso com 5 estrelas',
        'Ana conseguiu um aumento de 30% após o curso',
        'Carlos eliminou suas dívidas em 6 meses'
    ];
    
    let notificationIndex = 0;
    
    function showNotification() {
        if (notificationPopup) {
            // Atualiza o conteúdo da notificação
            const notificationText = notifications[notificationIndex];
            const notificationImage = notificationPopup.querySelector('img');
            
            // Aqui você poderia atualizar dinamicamente a imagem ou texto
            // notificationPopup.querySelector('p').textContent = notificationText;
            
            // Mostra a notificação
            notificationPopup.classList.add('active');
            
            // Esconde após 5 segundos
            setTimeout(() => {
                notificationPopup.classList.remove('active');
            }, 5000);
            
            // Avança para a próxima notificação
            notificationIndex = (notificationIndex + 1) % notifications.length;
            
            // Agenda a próxima notificação (entre 1 e 2 minutos)
            const nextTime = Math.random() * (120000 - 60000) + 60000;
            setTimeout(showNotification, nextTime);
        }
    }
    
    // Inicia o ciclo de notificações após 15 segundos
    setTimeout(showNotification, 15000);
}

// Popup de urgência quando o usuário tenta sair
function initExitIntent() {
    let exitShown = false;
    
    document.addEventListener('mouseleave', (e) => {
        // Detecta quando o mouse sai pela parte superior da página
        if (e.clientY < 20 && !exitShown) {
            showExitPopup();
            exitShown = true;
            
            // Permite mostrar novamente após 30 minutos
            setTimeout(() => {
                exitShown = false;
            }, 30 * 60 * 1000);
        }
    });
    
    function showExitPopup() {
        const calculatorPopup = document.getElementById('calculator-popup');
        
        if (calculatorPopup) {
            calculatorPopup.classList.add('active');
            document.body.classList.add('popup-open');
        }
    }
}

// Mostra popup de urgência em momentos estratégicos
function showUrgencyPopup() {
    const notificationPopup = document.getElementById('notification-popup');
    
    if (notificationPopup && !notificationPopup.classList.contains('active')) {
        notificationPopup.classList.add('active');
        
        setTimeout(() => {
            notificationPopup.classList.remove('active');
        }, 5000);
    }
}

// Rastreamento de progresso na página
function initProgressTracking() {
    // Elementos a serem rastreados
    const sections = document.querySelectorAll('section');
    const ctas = document.querySelectorAll('.btn-primary');
    
    // Rastreia visualização de seções
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                section.classList.add('viewed');
                
                // Poderia enviar dados para analytics aqui
                console.log(`Seção visualizada: ${section.id || 'sem-id'}`);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Rastreia interações com CTAs
    ctas.forEach(cta => {
        cta.addEventListener('click', () => {
            // Poderia enviar dados para analytics aqui
            console.log(`CTA clicado: ${cta.textContent}`);
        });
    });
}

// Animações ao scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.benefit-card, .module-card, .pricing-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Efeitos de hover nos botões
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('hover');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('hover');
        });
    });
});

// Simulação de compras recentes para criar urgência
function simulateRecentPurchases() {
    const purchaseMessages = [
        'João acabou de adquirir o Plano Premium',
        'Maria acabou de adquirir o Plano VIP',
        'Carlos acabou de adquirir o Plano Básico',
        'Ana acabou de adquirir o Plano Premium',
        'Roberto acabou de adquirir o Plano VIP'
    ];
    
    const notificationPopup = document.getElementById('notification-popup');
    
    if (notificationPopup) {
        // Escolhe uma mensagem aleatória
        const randomMessage = purchaseMessages[Math.floor(Math.random() * purchaseMessages.length)];
        
        // Atualiza e mostra a notificação
        // notificationPopup.querySelector('p').textContent = randomMessage;
        notificationPopup.classList.add('active');
        
        setTimeout(() => {
            notificationPopup.classList.remove('active');
        }, 5000);
        
        // Agenda a próxima simulação (entre 3 e 5 minutos)
        const nextTime = Math.random() * (300000 - 180000) + 180000;
        setTimeout(simulateRecentPurchases, nextTime);
    }
}

// Inicia simulação após 2 minutos
setTimeout(simulateRecentPurchases, 120000);
