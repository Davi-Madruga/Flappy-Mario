const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

let gameOver = false;
let pontos = 0;
let restart = false;

const pontuacao = document.getElementById('pontuacao');
const inicioPartida = performance.now();
const pontosPorSegundo = 10;
let pausado = document.hidden;
let inicioPausa = pausado ? inicioPartida : 0;
let tempoPausado = 0;

const jump = () => {
    if (pausado || gameOver || mario.classList.contains('jump')) {
        return
    }

    new Audio('audio/jump-sound-effect.mp3').play();
    mario.classList.add("jump");
}

// A animação só termina depois de consumir seu tempo ativo, sem a pausa.
mario.addEventListener('animationend', (event) => {
    if (event.animationName === 'jump') {
        mario.classList.remove('jump');
    }

    if (event.animationName === 'game-over' && gameOver) {
        playAgain.classList.remove('hidden');
        restart = true;
    }
});

const atualizarPontuacao = () => {
    const segundos = (performance.now() - inicioPartida - tempoPausado) / 1000;
    const novosPontos = Math.floor(segundos * pontosPorSegundo);

    if (novosPontos !== pontos) {
        pontos = novosPontos;
        pontuacao.textContent = pontos;
    }
};

const loop = setInterval(()=>{
    if (pausado) {
        return;
    }

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

    }

}, 10)

const opcoes = ['KeyW', 'Space', 'ArrowUp'];

document.addEventListener("keydown", (event) => {
    if (opcoes.includes(event.code)) {
        event.preventDefault();
    }
    
    if (event.repeat || pausado) {
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

gameBoard.classList.toggle('pausado', pausado);

document.addEventListener('visibilitychange', () => {
    const agora = performance.now();

    if (document.hidden && !pausado) {
        pausado = true;
        inicioPausa = agora;
        gameBoard.classList.add('pausado');
    } else if (!document.hidden && pausado) {
        // Acumula todas as pausas para descontá-las da pontuação.
        tempoPausado += agora - inicioPausa;
        pausado = false;
        gameBoard.classList.remove('pausado');
    }
});

const velocidadeCano = 1200; // pixels por segundo

const ajustarVelocidadeCano = () => {
    const distancia = gameBoard.clientWidth + pipe.offsetWidth;
    const duracao = distancia / velocidadeCano;

    pipe.style.animationDuration = `${duracao}s`;
};

ajustarVelocidadeCano();

window.addEventListener('resize', ajustarVelocidadeCano);

const controlarPorToque = () => {
    if (pausado) {
        return;
    }

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
