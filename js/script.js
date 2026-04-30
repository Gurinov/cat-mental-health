// ============================================
//   Основной JavaScript файл
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех функций
    initNavigation();
    initConditionCards();
    initSmoothScroll();
    initMobileMenu();
});

// ============================================
//   Активное меню
// ============================================

function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
//   Раскрытие карточек расстройств
// ============================================

function initConditionCards() {
    const cards = document.querySelectorAll('.condition-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const details = this.querySelector('.condition-details');
            const button = this.querySelector('.toggle-btn');
            
            if (details && button) {
                details.classList.toggle('open');
                
                if (details.classList.contains('open')) {
                    button.textContent = 'Свернуть';
                    button.setAttribute('aria-expanded', 'true');
                } else {
                    button.textContent = 'Подробнее';
                    button.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
}

// ============================================
//   Плавный скролл по якорям
// ============================================

function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
//   Мобильное меню
// ============================================

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Анимация гамбургера
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// ============================================
//   Интерактивный мини-тест (опционально)
// ============================================

function initQuiz() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;
    
    const questions = [
        {
            question: "Как часто вы чувствуете тревогу без очевидной причины?",
            answers: ["Никогда", "Иногда", "Часто", "Постоянно"],
            scores: [0, 1, 2, 3]
        },
        {
            question: "Насколько сложно вам заснуть из-за навязчивых мыслей?",
            answers: ["Очень легко", "Иногда сложно", "Часто сложно", "Почти невозможно"],
            scores: [0, 1, 2, 3]
        },
        {
            question: "Чувствуете ли вы упадок сил и потерю интереса к делам?",
            answers: ["Нет", "Редко", "Иногда", "Да, постоянно"],
            scores: [0, 1, 2, 3]
        }
    ];
    
    let currentQuestion = 0;
    let totalScore = 0;
    
    function showQuestion(index) {
        if (index >= questions.length) {
            showResult();
            return;
        }
        
        const q = questions[index];
        quizContainer.innerHTML = `
            <div class="question">
                <h4>${q.question}</h4>
                <div class="answers">
                    ${q.answers.map((answer, i) => `
                        <button class="btn-answer" data-score="${q.scores[i]}">${answer}</button>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.querySelectorAll('.btn-answer').forEach(btn => {
            btn.addEventListener('click', function() {
                totalScore += parseInt(this.getAttribute('data-score'));
                currentQuestion++;
                showQuestion(currentQuestion);
            });
        });
    }
    
    function showResult() {
        let resultText = '';
        let recommendation = '';
        
        if (totalScore <= 3) {
            resultText = 'Всё в порядке!';
            recommendation = 'Ваше психическое состояние в норме. Продолжайте заботиться о себе!';
        } else if (totalScore <= 6) {
            resultText = 'Есть лёгкие признаки';
            recommendation = 'Рекомендуем обратить внимание на своё состояние и больше отдыхать.';
        } else {
            resultText = 'Стоит обратиться к специалисту';
            recommendation = 'Ваши ответы показывают, что консультация специалиста может быть полезна.';
        }
        
        quizContainer.innerHTML = `
            <div class="result">
                <h3>${resultText}</h3>
                <p>${recommendation}</p>
                <a href="help.html" class="btn btn-accent">Получить помощь</a>
            </div>
        `;
    }
    
    showQuestion(0);
}

// Запуск теста если есть контейнер
if (document.querySelector('.quiz-container')) {
    initQuiz();
}

// ============================================
//   Анимация появления элементов при скролле
// ============================================

function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.condition-card, .help-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Запуск анимации
initScrollAnimation();
