// 공룡 데이터
const dinosaurs = [
    {
        name: '티라노사우루스',
        image: 'images/tyrannosaurus.png',
        description: '백악기 후기의 대표적인 육식공룡',
        era: '백악기',
        classification: '육식공룡'
    },
    {
        name: '벨로시랩터',
        image: 'images/velociraptor.png',
        description: '날렵하고 지능이 높은 소형 육식공룡',
        era: '백악기',
        classification: '육식공룡'
    },
    {
        name: '트리케라톱스',
        image: 'images/triceratops.png',
        description: '세 개의 뿔을 가진 초식공룡',
        era: '백악기',
        classification: '초식공룡'
    },
    {
        name: '스테고사우루스',
        image: 'images/stegosaurus.png',
        description: '등판에 특이한 골판을 가진 초식공룡',
        era: '쥐라기',
        classification: '초식공룡'
    },
    {
        name: '브라키오사우루스',
        image: 'images/brachiosaurus.png',
        description: '긴 목을 가진 거대 초식공룡',
        era: '쥐라기',
        classification: '초식공룡'
    },
    {
        name: '안킬로사우루스',
        image: 'images/ankylosaurus.png',
        description: '전신 갑옷과 꼬리 방망이를 가진 초식공룡',
        era: '백악기',
        classification: '초식공룡'
    }
];

// 랜덤 공룡 선택 함수
function getRandomDinosaurs(count) {
    const shuffled = [...dinosaurs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// 공룡 카드 생성 함수
function createDinosaurCard(dino) {
    return `
        <div class="dinosaur-card">
            <img src="${dino.image}" alt="${dino.name}" loading="lazy">
            <h3>${dino.name}</h3>
            <p>${dino.description}</p>
            <div class="tags">
                <span class="tag" data-type="era"><i class="fas fa-clock"></i>${dino.era}</span>
                <span class="tag" data-type="classification"><i class="fas fa-utensils"></i>${dino.classification}</span>
            </div>
        </div>
    `;
}

// 화면 크기에 따라 표시할 공룡 수 결정
function updateDinosaurGrid() {
    const grid = document.querySelector('.dinosaur-grid');
    if (!grid) return;

    const isMobile = window.innerWidth <= 768;
    const count = isMobile ? 4 : 6;
    const randomDinos = getRandomDinosaurs(count);
    
    grid.innerHTML = randomDinos.map(createDinosaurCard).join('');
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    updateDinosaurGrid();
    
    // 새로고침 버튼 이벤트 리스너 추가
    const refreshButton = document.getElementById('refresh-dinos');
    if (refreshButton) {
        refreshButton.addEventListener('click', updateDinosaurGrid);
    }
});

// 화면 크기 변경 시 실행
window.addEventListener('resize', updateDinosaurGrid); 