// 모든 공룡 데이터
const allDinosaurs = [
    {
        name: '티라노사우루스',
        image: 'images/tyrannosaurus.png'
    },
    {
        name: '브라키오사우루스',
        image: 'images/brachiosaurus.png'
    },
    {
        name: '스테고사우루스',
        image: 'images/stegosaurus.png'
    },
    {
        name: '벨로시랍토르',
        image: 'images/velociraptor.png'
    },
    {
        name: '트리케라톱스',
        image: 'images/triceratops.png'
    },
    {
        name: '안킬로사우루스',
        image: 'images/ankylosaurus.png'
    },
    {
        name: '프테라노돈',
        image: 'images/pteranodon.png'
    },
    {
        name: '모사사우루스',
        image: 'images/mosasaurus.png'
    }
];

// 배열을 무작위로 섞는 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 공룡 도감 섹션 업데이트 함수
function updateDictionaryPreview() {
    const dinosaurGrid = document.querySelector('#dictionary .dinosaur-grid');
    if (!dinosaurGrid) return;

    // 기존 내용 비우기
    dinosaurGrid.innerHTML = '';

    // 공룡 배열을 섞고 처음 4개만 선택
    const selectedDinosaurs = shuffleArray([...allDinosaurs]).slice(0, 4);

    // 선택된 공룡들을 화면에 표시
    selectedDinosaurs.forEach(dino => {
        const dinoCard = document.createElement('div');
        dinoCard.className = 'dinosaur-card';
        dinoCard.innerHTML = `
            <img src="${dino.image}" alt="${dino.name}" loading="lazy">
        `;
        dinosaurGrid.appendChild(dinoCard);
    });
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', updateDictionaryPreview); 