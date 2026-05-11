// ============================================
//   Основной JavaScript файл
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех функций
    initNavigation();
    initConditionCards();
    initSmoothScroll();
    initMobileMenu();
    initAccordion();
    initBackToTop();
    initQuiz();
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
//   Аккордеоны на страницах состояний
// ============================================

function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Закрыть все остальные
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherHeader.nextElementSibling.classList.remove('open');
                }
            });
            
            // Переключить текущий
            this.setAttribute('aria-expanded', !isExpanded);
            content.classList.toggle('open');
        });
    });
}

// ============================================
//   Кнопка наверх
// ============================================

function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
//   Интерактивный мини-тест
// ============================================

const quizQuestions = [
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
    },
    {
        question: "Проверяете ли вы вещи несколько раз (дверь, газ, выключатели)?",
        answers: ["Никогда", "Иногда", "Часто", "Всегда"],
        scores: [0, 1, 2, 3]
    },
    {
        question: "Избегаете ли вы социальных ситуаций из-за беспокойства?",
        answers: ["Никогда", "Иногда", "Часто", "Постоянно"],
        scores: [0, 1, 2, 3]
    },
    {
        question: "Чувствуете ли вы необходимость выполнять действия по определённому ритуалу?",
        answers: ["Никогда", "Иногда", "Часто", "Постоянно"],
        scores: [0, 1, 2, 3]
    },
    {
        question: "Мешают ли эти состояния вашей повседневной жизни?",
        answers: ["Нет", "Немного", "Заметно", "Сильно мешают"],
        scores: [0, 1, 2, 3]
    }
];

let currentQuestion = 0;
let totalScore = 0;
let selectedScores = [];

function initQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;
    
    renderQuestion();
}

function renderQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    const quizResult = document.getElementById('quiz-result');
    
    if (currentQuestion >= quizQuestions.length) {
        showResult();
        return;
    }
    
    const q = quizQuestions[currentQuestion];
    const progress = ((currentQuestion) / quizQuestions.length) * 100;
    
    // Обновляем прогресс бар
    const progressFill = document.querySelector('.progress-fill');
    const currentQuestionEl = document.querySelector('.current-question');
    const totalQuestionsEl = document.querySelector('.total-questions');
    
    if (progressFill) progressFill.style.width = progress + '%';
    if (currentQuestionEl) currentQuestionEl.textContent = currentQuestion + 1;
    if (totalQuestionsEl) totalQuestionsEl.textContent = quizQuestions.length;
    
    quizContainer.innerHTML = `
        <div class="question">
            <h4>${q.question}</h4>
            <div class="answers">
                ${q.answers.map((answer, i) => `
                    <button class="btn-answer" data-score="${q.scores[i]}" onclick="selectAnswer(${i}, ${q.scores[i]})">${answer}</button>
                `).join('')}
            </div>
        </div>
    `;
}

function selectAnswer(index, score) {
    const buttons = document.querySelectorAll('.btn-answer');
    buttons.forEach((btn, i) => {
        btn.classList.toggle('selected', i === index);
    });
    
    selectedScores[currentQuestion] = score;
    
    // Небольшая задержка для визуального подтверждения выбора
    setTimeout(() => {
        currentQuestion++;
        renderQuestion();
    }, 250);
}

function showResult() {
    const quizContainer = document.getElementById('quiz-container');
    const quizResult = document.getElementById('quiz-result');
    const progressFill = document.querySelector('.progress-fill');
    
    totalScore = selectedScores.reduce((a, b) => a + b, 0);
    progressFill.style.width = '100%';
    
    let resultTitle = '';
    let resultDescription = '';
    let resultEmoji = '';
    let recommendations = [];
    
    if (totalScore <= 7) {
        resultEmoji = '😊🐱';
        resultTitle = 'Всё в порядке!';
        resultDescription = 'Ваши ответы показывают, что ваше психическое состояние в пределах нормы. Продолжайте заботиться о себе!';
        recommendations = [
            'Поддерживайте здоровый режим дня',
            'Практикуйте техники релаксации для профилактики',
            'Обращайте внимание на изменения в настроении'
        ];
    } else if (totalScore <= 14) {
        resultEmoji = '🤔🐱';
        resultTitle = 'Есть лёгкие признаки';
        resultDescription = 'Ваши ответы показывают наличие некоторых симптомов, которые могут указывать на лёгкую тревожность или стресс. Рекомендуется обратить внимание на своё состояние.';
        recommendations = [
            'Попробуйте техники управления стрессом',
            'Убедитесь, что вы достаточно отдыхаете',
            'Рассмотрите возможность консультации с психологом'
        ];
    } else {
        resultEmoji = '💙🐱';
        resultTitle = 'Стоит обратиться к специалисту';
        resultDescription = 'Ваши ответы показывают значительный уровень симптомов. Консультация со специалистом может быть очень полезна для улучшения качества жизни.';
        recommendations = [
            'Запишитесь на консультацию к психологу или психотерапевту',
            'Не оставайтесь с этим в одиночку — помощь доступна',
            'Помните: обращение за помощью — это признак силы, а не слабости'
        ];
    }
    
    quizContainer.style.display = 'none';
    quizResult.style.display = 'block';
    
    document.getElementById('result-emoji').textContent = resultEmoji;
    document.getElementById('result-title').textContent = resultTitle;
    document.getElementById('result-description').textContent = resultDescription;
    
    document.getElementById('result-details').innerHTML = `
        <h4>Рекомендации:</h4>
        <ul>
            ${recommendations.map(r => `<li>${r}</li>`).join('')}
        </ul>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-light);">
            <strong>Ваш результат:</strong> ${totalScore} из ${quizQuestions.length * 3} возможных баллов
        </p>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    totalScore = 0;
    selectedScores = [];
    
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    
    renderQuestion();
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
    
    const animatedElements = document.querySelectorAll('.condition-card, .help-card, .metaphor-card, .step-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Запуск анимации при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimation();
});
