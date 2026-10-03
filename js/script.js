const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

let gameOver = false;
let pontos = 0;
let restart = false;

const pontuacao = document.getElementById('pontuacao');
const inicioPartida = performance.now();
const pontosPorSegundo = 10;

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

const atualizarPontuacao = () => {
    const segundos = (performance.now() - inicioPartida) / 1000;
    const novosPontos = Math.floor(segundos * pontosPorSegundo);

    if (novosPontos !== pontos) {
        pontos = novosPontos;
        pontuacao.textContent = pontos;
    }
};

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
    
    atualizarPontuacao();
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
    if (opcoes.includes(event.code)) {
        event.preventDefault();
    }
    
    if (event.repeat) {
        return;
    }

    if (!gameOver && opcoes.includes(event.code)) {
        jump();
    } else if (gameOver && restart){
        window.location.reload();
    }
});

const gameBoard = document.querySelector('.game-board');
const playAgain = document.querySelector('.play-again');

const velocidadeCano = 1200; // pixels por segundo

const ajustarVelocidadeCano = () => {
    const distancia = gameBoard.clientWidth + pipe.offsetWidth;
    const duracao = distancia / velocidadeCano;

    pipe.style.animationDuration = `${duracao}s`;
};

ajustarVelocidadeCano();

window.addEventListener('resize', ajustarVelocidadeCano);

const controlarPorToque = () => {
    if (!gameOver) {
        jump();
    } else if (restart) {
        window.location.reload();
    }
};

gameBoard.addEventListener('pointerdown', (event) => {
    if (event.isPrimary && event.button === 0) {
        controlarPorToque();
    }
});

playAgain.addEventListener('pointerdown', (event) => {
    if (event.isPrimary && event.button === 0) {
        controlarPorToque();
    }
});