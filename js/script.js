const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const jump = () => {
    new Audio('audio/jump-sound-effect.mp3').play();
    mario.classList.add("jump");
    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500);
}



const loop = setInterval(()=>{

const pipePosition = pipe.offsetLeft;
const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');

    if (pipePosition <= 160 && pipePosition > 0 && marioPosition <= 100){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '80px';
        new Audio('audio/death-sound-effect.mp3').play();
        clearInterval(loop)
    }

}, 10)

const opcoes = ['KeyW', 'Space', 'ArrowUp'];

document.addEventListener("keydown", (event) => {
    if (opcoes.includes(event.code)) {
        jump();
    }
});