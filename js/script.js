const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

let gameOver = false;
let pontos = 0;


const jump = () => {
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

    if (pipePosition <= 160 && pipePosition > 0 && marioPosition <= 100){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'game-over 2s linear';
        mario.style.bottom = `${marioPosition}px`;

        clouds.style.animation = 'none';
        console.log(cloudsPosition,marioPosition,pipePosition);
        clouds.style.left = `${cloudsPosition}px`;

        mario.src = 'images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '80px';

        new Audio('audio/death-sound-effect.mp3').play();
        clearInterval(loop)
        clearInterval(aumentarPontuacao)
        gameOver = true

        setTimeout(() => {
            const playAgain = document.querySelector('.play-again')
            playAgain.classList.remove("hidden");
        },2000)
    }

}, 10)

const opcoes = ['KeyW', 'Space', 'ArrowUp'];

document.addEventListener("keydown", (event) => {
    if (!gameOver && opcoes.includes(event.code)) {
        jump();
    } else if (gameOver){
        window.location.reload();
    }
});