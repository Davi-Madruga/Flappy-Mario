const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

let gameOver = false;
let pontos = 0;
let restart = false;

const jump = () => {
    if(mario.classList.contains('jump')) {
        return
    }

    new Audio('audio/jump-sound-effect.mp3').play();
    mario.classList.add("jump");
    
    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500);
}

const aumentarPontuacao = setInterval(()=>{
    let pontuacao = document.getElementById("pontuacao");
    pontos++;
    pontuacao.textContent = pontos;
},100)

const loop = setInterval(()=>{

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');
    const cloudsPosition = clouds.offsetLeft;

    const marioRect = mario.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();      

    const marioHitbox = {
    left: marioRect.left + 70,
    right: marioRect.right - 35,
    top: marioRect.top + 20,
    bottom: marioRect.bottom + 5};
    
    const pipeHitbox = pipeRect;

    const colidiu =
        marioHitbox.left < pipeHitbox.right &&
        marioHitbox.right > pipeHitbox.left &&
        marioHitbox.bottom > pipeHitbox.top;
    
    if (colidiu){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'game-over 2s ease-in forwards';
        mario.style.bottom = `${marioPosition}px`;

        clouds.style.animation = 'none';
        console.log(cloudsPosition,marioPosition,pipePosition);
        clouds.style.left = `${cloudsPosition}px`;

        mario.src = 'images/game-over.png';
        mario.style.width = '80px';
        mario.style.marginLeft = '70px';

        new Audio('audio/death-sound-effect.mp3').play();
        clearInterval(loop)
        clearInterval(aumentarPontuacao)
        gameOver = true

        setTimeout(() => {
            const playAgain = document.querySelector('.play-again')
            playAgain.classList.remove("hidden");
            restart = true;
        },2000)
    }

}, 10)

const opcoes = ['KeyW', 'Space', 'ArrowUp'];

document.addEventListener("keydown", (event) => {
    if (event.repeat) {
        return;
    }

    if (!gameOver && opcoes.includes(event.code)) {
        jump();
    } else if (gameOver && restart){
        window.location.reload();
    }
});