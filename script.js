const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('rolando', window.scrollY > 50);
});

const palavras = ['Fullstack', 'Prompt Engineer', 'Automações', 'Agentes de IA'];
const alvo = document.getElementById('digitando');
let indicePalavra = 0;
let indiceLetra = 0;
let apagando = false;

function digitar() {
    const palavra = palavras[indicePalavra];
    indiceLetra += apagando ? -1 : 1;
    alvo.textContent = palavra.slice(0, indiceLetra);

    let espera = apagando ? 60 : 120;

    if (!apagando && indiceLetra === palavra.length) {
        apagando = true;
        espera = 1500;
    } else if (apagando && indiceLetra === 0) {
        apagando = false;
        indicePalavra = (indicePalavra + 1) % palavras.length;
        espera = 400;
    }

    setTimeout(digitar, espera);
}

digitar();
