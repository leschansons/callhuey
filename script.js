const ORIGINAL_W = 2358;
const ORIGINAL_H = 5112;

const HOTSPOT_DATA = [
  { coords:[1670,2042,1820,2192], sound:'sounds/sound1.mp3' },
  { coords:[1596,1874,1743,2021], sound:'sounds/sound2.mp3' },
  { coords:[1437,1755,1600,1918], sound:'sounds/sound3.mp3' },
  { coords:[1253,1729,1415,1891], sound:'sounds/sound4.mp3' },
];

// 2단 레이어
const stage   = document.getElementById('stage');
const imgBg   = document.getElementById('layer1');
const imgSpin = document.getElementById('layer2');

// 현재 재생 중인 사운드 추적
let currentAudio = null;

function playSound(path) {
  // 기존 재생 중 소리 멈춤
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(path);
  currentAudio.play().catch(e => {
    console.warn("자동 재생 실패 (브라우저 제한일 수 있음)", e);
  });
}

function layoutHotspots(){
  const rect = imgBg.getBoundingClientRect();
  const scaleX = rect.width  / ORIGINAL_W;
  const scaleY = rect.height / ORIGINAL_H;

  document.querySelectorAll('.hotspot').forEach(h=>h.remove());

  HOTSPOT_DATA.forEach((spot)=>{
    const [x1,y1,x2,y2] = spot.coords;
    const div = document.createElement('div');
    div.className = 'hotspot';
    div.style.left   = `${rect.left + x1*scaleX}px`;
    div.style.top    = `${rect.top  + y1*scaleY}px`;
    div.style.width  = `${(x2-x1)*scaleX}px`;
    div.style.height = `${(y2-y1)*scaleY}px`;

    div.addEventListener('click', ()=>{
      imgSpin.classList.remove('rotate');
      void imgSpin.offsetWidth;
      imgSpin.classList.add('rotate');

      playSound(spot.sound);
    });

    document.body.appendChild(div);
  });
}

window.addEventListener('load', () => {
  layoutHotspots();
  playSound("sounds/start.mp3"); // 🔊 링크 열자마자 재생
});

window.addEventListener('resize', () => {
  clearTimeout(window.__hsTimer);
  window.__hsTimer = setTimeout(layoutHotspots, 150);
});
