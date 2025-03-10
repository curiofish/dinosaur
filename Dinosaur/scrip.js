// DOM 요소들 선택
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainMenu = document.querySelector('.main-menu');
const dropdowns = document.querySelectorAll('.dropdown');
const timelineHandle = document.getElementById('timeline-handle');
const eraCards = document.querySelectorAll('.era-card');
const heroSlider = document.querySelector('.hero-slider');

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 영웅 배너 슬라이더 초기화
    initHeroSlider();
    
    // 타임라인 슬라이더 초기화
    initTimelineSlider();
    
    // 오늘의 공룡 데이터 로드
    loadFeaturedDino();
    
    // 뉴스레터 폼 제출 핸들러
    initNewsletterForm();
});

// 모바일 메뉴 토글
mobileMenuToggle.addEventListener('click', function() {
    mainMenu.classList.toggle('active');
});

// 모바일에서 드롭다운 토글
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// 히어로 슬라이더 초기화
function initHeroSlider() {
    // 슬라이더 이미지 배열
    const sliderImages = [
        'images/hero-bg.jpg',
        'images/hero-bg2.jpg',
        'images/hero-bg3.jpg'
    ];
    
    let currentSlide = 0;
    
    // 배경 이미지 변경 함수
    function changeBackground() {
        document.getElementById('hero').style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${sliderImages[currentSlide]}')`;
        currentSlide = (currentSlide + 1) % sliderImages.length;
    }
    
    // 초기 배경 설정
    changeBackground();
    
    // 7초마다 배경 변경
    setInterval(changeBackground, 7000);
}

// 타임라인 슬라이더 초기화
function initTimelineSlider() {
    let isDragging = false;
    const slider = document.querySelector('.timeline-slider');
    const sliderRect = slider.getBoundingClientRect();
    const sliderWidth = sliderRect.width;
    
    // 타임라인 위치에 따라 시대 정보 표시
    function updateEraInfo(position) {
        const percentage = position / sliderWidth * 100;
        
        // 모든 카드 숨기기
        eraCards.forEach(card => card.classList.remove('active'));
        
        // 위치에 따라 적절한 시대 카드 표시
        if (percentage < 30) {
            document.getElementById('triassic').classList.add('active');
        } else if (percentage < 65) {
            document.getElementById('jurassic').classList.add('active');
        } else {
            document.getElementById('cretaceous').classList.add('active');
        }
    }
    
    // 핸들 이동 함수
    function moveHandle(e) {
        if (!isDragging) return;
        
        let clientX;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }
        
        const sliderRect = slider.getBoundingClientRect();
        let position = clientX - sliderRect.left;
        
        // 슬라이더 범위 내로 제한
        position = Math.max(0, Math.min(position, sliderRect.width));
        
        // 핸들 위치 업데이트
        const leftPercentage = (position / sliderRect.width) * 100;
        timelineHandle.style.left = `${leftPercentage}%`;
        
        // 시대 정보 업데이트
        updateEraInfo(position);
    }
    
    // 마우스/터치 이벤트 리스너
    timelineHandle.addEventListener('mousedown', () => {
        isDragging = true;
    });
    
    timelineHandle.addEventListener('touchstart', () => {
        isDragging = true;
    });
    
    document.addEventListener('mousemove', moveHandle);
    document.addEventListener('touchmove', moveHandle);
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // 시대 마커 클릭 이벤트
    const eraMarkers = document.querySelectorAll('.era-mark');
    eraMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const leftPercentage = parseFloat(this.style.left);
            timelineHandle.style.left = `${leftPercentage}%`;
            
            // 시대 정보 업데이트
            updateEraInfo((leftPercentage / 100) * sliderWidth);
        });
    });
    
    // 초기 시대 정보 표시
    updateEraInfo(0.1 * sliderWidth);
}

// 오늘의 공룡 데이터 로드
function loadFeaturedDino() {
    // 실제 구현에서는 서버에서 데이터를 가져오지만, 여기서는 샘플 데이터 사용
    const featuredDinos = [
        {
            name: '티라노사우루스 렉스',
            image: 'images/trex.jpg',
            length: '12-14m',
            weight: '8-14톤',
            diet: '육식',
            period: '백악기 후기',
            description: '\'폭군 도마뱀 왕\'이라는 뜻의 티라노사우루스 렉스는 역사상 가장 유명한 육식 공룡입니다. 30cm 길이의 이빨과 6,000kg의 물림 힘으로 뼈를 부술 수 있었습니다. 앞다리는 매우 작았지만 두 다리로 시속 30km까지 달릴 수 있었다고 추정됩니다.',
            funFact: '최근 연구에 따르면 티라노사우루스의 몸에는 일부 깃털이 있었을 가능성도 제기되고 있어요!'
        },
        {
            name: '트리케라톱스',
            image: 'images/triceratops.jpg',
            length: '8-9m',
            weight: '6-12톤',
            diet: '초식',
            period: '백악기 후기',
            description: '\'세 개의 뿔 얼굴\'이라는 뜻을 가진 이 공룡은 이마에 두 개의 긴 뿔과 코 위에 짧은 뿔, 그리고 뒤통수를 덮는 커다란 프릴이 특징입니다. 이 방어용 무기들은 티라노사우루스와 같은 포식자로부터 자신을 방어하는 데 사용했습니다.',
            funFact: '트리케라톱스의 두개골은 공룡 중에서 가장 큰 두개골 중 하나로, 길이가 2미터가 넘기도 했어요!'
        },
        {
            name: '스테고사우루스',
            image: 'images/stegosaurus.jpg',
            length: '9m',
            weight: '5-7톤',
            diet: '초식',
            period: '쥐라기 후기',
            description: '등에 2열로 배열된 17개의 큰 뼈 판과 꼬리 끝의 4개의 가시가 특징인 공룡입니다. 뼈 판은 체온 조절과 과시용으로 사용되었을 것으로 추정됩니다. 뇌가 호두 크기로 매우 작았습니다.',
            funFact: '스테고사우루스의 꼬리 가시는 \'타이고스타크스(thagomizer)\'라고 불리는데, 이 이름은 1982년 개리 라슨의 만화에서 유래했어요!'
        }
    ];
    
    // 랜덤으로 오늘의 공룡 선택 (실제 사이트에서는 다른 로직 사용)
    const randomIndex = Math.floor(Math.random() * featuredDinos.length);
    const todaysDino = featuredDinos[randomIndex];
    
    // DOM 업데이트
    document.getElementById('featured-dino-img').src = todaysDino.image;
    document.getElementById('featured-dino-img').alt = todaysDino.name;
    document.getElementById('featured-dino-name').textContent = todaysDino.name;
    
    // 공룡 정보 업데이트
    const facts = document.querySelectorAll('.dino-facts .fact span');
    facts[0].textContent = `길이: ${todaysDino.length}`;
    facts[1].textContent = `무게: ${todaysDino.weight}`;
    facts[2].textContent = `식성: ${todaysDino.diet}`;
    facts[3].textContent = `시대: ${todaysDino.period}`;
    
    document.querySelector('.dino-description').textContent = todaysDino.description;
    document.querySelector('.fun-fact p').textContent = todaysDino.funFact;
}

// 뉴스레터 폼 제출 핸들러
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // 실제 구현에서는 서버로 데이터 전송
        alert(`${email} 주소로 뉴스레터 구독이 완료되었습니다. 감사합니다!`);
        
        // 폼 초기화
        this.reset();
    });
}

// 카테고리 카드 클릭 이벤트
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        const id = this.id;
        alert(`${id} 카테고리를 탐험합니다! 실제 구현에서는 해당 카테고리 페이지로 이동합니다.`);
    });
});

// 활동 카드 클릭 이벤트
const activityBtns = document.querySelectorAll('.btn-activity');
activityBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const activity = this.textContent.trim();
        alert(`${activity} 활동을 시작합니다! 실제 구현에서는 해당 활동 페이지로 이동합니다.`);
    });
});

// 윈도우 리사이즈 이벤트
window.addEventListener('resize', function() {
    // 모바일 메뉴 상태 리셋
    if (window.innerWidth > 768 && mainMenu.classList.contains('active')) {
        mainMenu.classList.remove('active');
    }
});
