const dinosaurs = [
    // 육식공룡
    {
        name: "티라노사우루스 렉스",
        period: "백악기 후기",
        image: "images/tyrannosaurus.png",
        description: "가장 강력한 육식 공룡 중 하나로, 강력한 턱과 예리한 이빨을 가졌습니다.",
        stats: {
            length: "12-14m",
            height: "4-6m",
            weight: "7톤",
            diet: "육식성"
        }
    },
    {
        name: "벨로시랍토르",
        period: "백악기 후기",
        image: "images/velociraptor.png",
        description: "매우 지능적이고 빠른 속도를 가진 소형 육식 공룡입니다.",
        stats: {
            length: "2m",
            height: "0.5m",
            weight: "15kg",
            diet: "육식성"
        }
    },
    {
        name: "알로사우루스",
        period: "쥐라기 후기",
        image: "images/allosaurus.png",
        description: "쥐라기 시대의 정점 포식자로, 강력한 턱과 날카로운 발톱을 가졌습니다.",
        stats: {
            length: "9-12m",
            height: "3.5m",
            weight: "2.5톤",
            diet: "육식성"
        }
    },
    {
        name: "스피노사우루스",
        period: "백악기 중기",
        image: "images/spinosaurus.png",
        description: "등에 큰 돛을 가진 반수생 육식공룡으로, 물고기를 주로 잡아먹었습니다.",
        stats: {
            length: "15-18m",
            height: "4.5m",
            weight: "7-9톤",
            diet: "육식성/어식성"
        }
    },
    {
        name: "카르카로돈토사우루스",
        period: "백악기 중기",
        image: "images/carcharodontosaurus.png",
        description: "이름은 '상어이빨도마뱀'이란 뜻으로, 거대한 크기와 날카로운 이빨을 가졌습니다.",
        stats: {
            length: "13-15m",
            height: "4m",
            weight: "6-8톤",
            diet: "육식성"
        }
    },

    // 초식공룡
    {
        name: "트리케라톱스",
        period: "백악기 후기",
        image: "images/triceratops.png",
        description: "특징적인 세 개의 뿔과 큰 프릴을 가진 초식 공룡입니다.",
        stats: {
            length: "8-9m",
            height: "3m",
            weight: "6-12톤",
            diet: "초식성"
        }
    },
    {
        name: "브라키오사우루스",
        period: "쥐라기 후기",
        image: "images/brachiosaurus.png",
        description: "긴 목을 가진 거대 초식 공룡으로, 높은 나무의 잎을 먹었습니다.",
        stats: {
            length: "30m",
            height: "13m",
            weight: "50톤",
            diet: "초식성"
        }
    },
    {
        name: "스테고사우루스",
        period: "쥐라기 후기",
        image: "images/stegosaurus.png",
        description: "등판의 특징적인 골판과 꼬리의 가시를 가진 초식 공룡입니다.",
        stats: {
            length: "9m",
            height: "4m",
            weight: "5톤",
            diet: "초식성"
        }
    },
    {
        name: "파라사우롤로푸스",
        period: "백악기 후기",
        image: "images/parasaurolophus.png",
        description: "머리에 긴 관 모양의 돌기를 가진 오리주둥이 공룡입니다.",
        stats: {
            length: "10m",
            height: "4m",
            weight: "2.5톤",
            diet: "초식성"
        }
    },
    {
        name: "안킬로사우루스",
        period: "백악기 후기",
        image: "images/ankylosaurus.png",
        description: "전신을 덮는 갑옷과 꼬리에 달린 철퇴를 가진 장갑 공룡입니다.",
        stats: {
            length: "8m",
            height: "1.7m",
            weight: "6톤",
            diet: "초식성"
        }
    },

    // 비행 파충류
    {
        name: "프테라노돈",
        period: "백악기 후기",
        image: "images/pteranodon.png",
        description: "날개 폭이 7미터에 달하는 거대한 비행 파충류입니다.",
        stats: {
            wingspan: "7m",
            height: "1.8m",
            weight: "20-25kg",
            diet: "어식성"
        }
    },
    {
        name: "케찰코아틀루스",
        period: "백악기 후기",
        image: "images/quetzalcoatlus.png",
        description: "역사상 가장 큰 비행 동물로, 기린 크기에 달했습니다.",
        stats: {
            wingspan: "10-11m",
            height: "3-4m",
            weight: "70-250kg",
            diet: "잡식성"
        }
    },
    {
        name: "디모르포돈",
        period: "쥐라기 전기",
        image: "images/dimorphodon.png",
        description: "큰 머리와 짧은 날개를 가진 초기 비행 파충류입니다.",
        stats: {
            wingspan: "1.4m",
            height: "1m",
            weight: "2kg",
            diet: "육식성"
        }
    },

    // 해양 파충류
    {
        name: "모사사우루스",
        period: "백악기 후기",
        image: "images/mosasaurus.png",
        description: "백악기 바다의 최상위 포식자였던 거대 해양 파충류입니다.",
        stats: {
            length: "17m",
            weight: "15톤",
            diet: "육식성",
            habitat: "해양"
        }
    },
    {
        name: "플레시오사우루스",
        period: "쥐라기 전기-백악기 후기",
        image: "images/plesiosaurus.png",
        description: "긴 목과 작은 머리를 가진 우아한 해양 파충류입니다.",
        stats: {
            length: "3-5m",
            weight: "450kg",
            diet: "어식성",
            habitat: "해양"
        }
    },
    {
        name: "이크티오사우루스",
        period: "트라이아스기-백악기",
        image: "images/ichthyosaurus.png",
        description: "돌고래와 비슷한 모습을 가진 빠른 해양 파충류입니다.",
        stats: {
            length: "2-4m",
            weight: "200-250kg",
            diet: "어식성",
            habitat: "해양"
        }
    }
];

function getRandomDinosaur() {
    const randomIndex = Math.floor(Math.random() * dinosaurs.length);
    return dinosaurs[randomIndex];
}

function updateDinoOfDay() {
    const dino = getRandomDinosaur();
    const dinoSection = document.getElementById('dino-of-day');
    
    dinoSection.innerHTML = `
        <div class="container">
            <h2 class="section-title">오늘의 공룡</h2>
            <div class="dino-highlight">
                <div class="dino-image">
                    <img src="${dino.image}" alt="${dino.name}" id="featured-dino-img">
                </div>
                <div class="dino-info">
                    <h3 id="featured-dino-name">${dino.name}</h3>
                    <div class="dino-facts">
                        <div class="fact">
                            <i class="fas fa-ruler-vertical"></i>
                            <span>길이: ${dino.stats.length || dino.stats.wingspan || 'N/A'}</span>
                        </div>
                        <div class="fact">
                            <i class="fas fa-weight"></i>
                            <span>무게: ${dino.stats.weight}</span>
                        </div>
                        <div class="fact">
                            <i class="fas fa-utensils"></i>
                            <span>식성: ${dino.stats.diet}</span>
                        </div>
                        <div class="fact">
                            <i class="fas fa-clock"></i>
                            <span>시대: ${dino.period}</span>
                        </div>
                    </div>
                    <p class="dino-description">${dino.description}</p>
                    <div class="fun-fact">
                        <h4><i class="fas fa-lightbulb"></i> 재미있는 사실</h4>
                        <p>${getFunFact(dino.name)}</p>
                    </div>
                    <a href="dictionary.html" class="btn btn-primary">더 알아보기</a>
                </div>
            </div>
        </div>
    `;
}

function getFunFact(dinoName) {
    const funFacts = {
        "티라노사우루스 렉스": "최근 연구에 따르면 티라노사우루스의 몸에는 일부 깃털이 있었을 가능성도 제기되고 있어요!",
        "벨로시랍토르": "실제 벨로시랍토르는 영화에서 보는 것보다 훨씬 작았으며, 온몸이 깃털로 덮여 있었어요!",
        "트리케라톱스": "트리케라톱스의 뿔은 나이가 들수록 계속 자랐으며, 가장 긴 뿔은 1미터가 넘었답니다!",
        "브라키오사우루스": "브라키오사우루스는 심장이 매우 커서 혈액을 긴 목 끝까지 보낼 수 있었어요!",
        "스테고사우루스": "스테고사우루스의 뇌는 호두 크기였지만, 엉덩이 근처에 두 번째 신경 중추가 있었답니다!",
        "프테라노돈": "프테라노돈은 이빨이 없었으며, 부리로 물고기를 잡아먹었어요!",
        "모사사우루스": "모사사우루스는 현대 고래처럼 꼬리 지느러미로 헤엄쳤어요!"
    };
    return funFacts[dinoName] || "이 공룡에 대해 아직 많은 것들이 연구되고 있어요!";
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', updateDinoOfDay); 