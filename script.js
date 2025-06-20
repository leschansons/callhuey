const ORIGINAL_W = 2358;
const ORIGINAL_H = 3946;

const HOTSPOT_DATA = [
  { coords:[1166,1176,1419,1416], sound:'sounds/start.mp3', rotate: false }, // ✅ 회전 없음
  { coords:[1454,1214,1545,1305], sound:'sounds/sound1.mp3', rotate: true },
  { coords:[1413,1122,1500,1207], sound:'sounds/sound2.mp3', rotate: true },
  { coords:[1325,1058,1416,1147], sound:'sounds/sound3.mp3', rotate: true },
  { coords:[1223,1043,1311,1132], sound:'sounds/sound4.mp3', rotate: true },
];

const stage   = document.getElementById('stage');
const imgBg   = document.getElementById('layer1');
const imgSpin = document.getElementById('layer2');
let currentAudio = null;

function playSound(path) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(path);
  currentAudio.play().catch(e => {
    console.warn("사운드 재생 실패 (브라우저 제한일 수 있음)", e);
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
      if (spot.rotate) {
        imgSpin.classList.remove('rotate');
        void imgSpin.offsetWidth;
        imgSpin.classList.add('rotate');
      }
      playSound(spot.sound);
    });

    document.body.appendChild(div);
  });
}

window.addEventListener('load', layoutHotspots);
window.addEventListener('resize', () => {
  clearTimeout(window.__hsTimer);
  window.__hsTimer = setTimeout(layoutHotspots, 150);
});
