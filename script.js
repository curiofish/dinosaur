// 위로 가기 버튼 기능
const scrollToTopBtn = document.getElementById('scroll-to-top');

// 스크롤 위치에 따라 버튼 표시/숨김
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// 버튼 클릭 시 맨 위로 부드럽게 스크롤
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 헤더 스크롤 효과
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 모바일 메뉴 토글 기능
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainMenu = document.querySelector('.main-menu');

if (mobileMenuToggle && mainMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mainMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// 드롭다운 메뉴 접근성 개선
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
    });
});

// 공룡 도감 태그 필터링 기능
document.addEventListener('DOMContentLoaded', function() {
    const tagButtons = document.querySelectorAll('.tag-btn');
    const resetButton = document.getElementById('reset-filters');
    const dinoCards = document.querySelectorAll('.dino-detail-card');
    let activeFilters = new Set();

    // 태그 버튼 클릭 이벤트
    tagButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tag = this.getAttribute('data-tag');
            
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                activeFilters.delete(tag);
            } else {
                this.classList.add('active');
                activeFilters.add(tag);
            }

            filterDinosaurs();
        });
    });

    // 필터 초기화 버튼 클릭 이벤트
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            activeFilters.clear();
            tagButtons.forEach(button => button.classList.remove('active'));
            dinoCards.forEach(card => card.style.display = 'block');
        });
    }

    // 공룡 카드 필터링 함수
    function filterDinosaurs() {
        if (activeFilters.size === 0) {
            dinoCards.forEach(card => card.style.display = 'block');
            return;
        }

        dinoCards.forEach(card => {
            const cardTags = card.getAttribute('data-tags')?.split(' ') || [];
            const shouldShow = Array.from(activeFilters).every(filter => cardTags.includes(filter));
            card.style.display = shouldShow ? 'block' : 'none';
        });
    }
}); 