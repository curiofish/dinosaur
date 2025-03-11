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

// 이미지 모달 기능
function initializeImageModal() {
    // 모달 요소 생성 및 추가
    const modalHTML = `
        <div class="modal" id="imageModal">
            <div class="modal-content">
                <button class="close-modal" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
                <img src="" alt="" class="modal-image" id="modalImage">
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    // 모든 공룡 이미지에 클릭 이벤트 추가 (공룡 탐험 섹션 제외)
    document.querySelectorAll('.dino-card img, .dino-detail-card img, .dinosaur-card img, .dino-image img, #featured-dino-img').forEach(img => {
        // 공룡 탐험 섹션의 이미지는 제외
        if (!img.closest('.category-grid')) {
            img.addEventListener('click', function() {
                modalImg.src = this.src;
                modalImg.alt = this.alt;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // 스크롤 방지
            });
        }
    });

    // 모달 닫기 함수
    window.closeModal = function() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // 스크롤 복구
    };

    // 모달 바깥 영역 클릭시 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// DOM이 로드되면 모달 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeImageModal();
}); 