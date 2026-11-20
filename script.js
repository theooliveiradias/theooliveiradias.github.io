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

const secaoProjetos = document.querySelector('.portifolio');
const carrossel = document.querySelector('.carrossel-projetos');
const botoesAnos = document.querySelectorAll('.anos-nav button');
const totalAnos = carrossel.children.length;
const desktop = window.matchMedia('(min-width: 1021px)');
let anoAtual = 0;
let animando = false;

function irParaAno(indice) {
    anoAtual = indice;
    carrossel.scrollTo({ left: indice * carrossel.clientWidth });
    botoesAnos.forEach((botao, i) => botao.classList.toggle('ativo', i === indice));
}

botoesAnos.forEach((botao, i) => botao.addEventListener('click', () => irParaAno(i)));

carrossel.addEventListener('scroll', () => {
    const indice = Math.round(carrossel.scrollLeft / carrossel.clientWidth);
    botoesAnos.forEach((botao, i) => botao.classList.toggle('ativo', i === indice));
    anoAtual = indice;
});

secaoProjetos.addEventListener('wheel', (evento) => {
    if (!desktop.matches || Math.abs(evento.deltaY) < Math.abs(evento.deltaX)) return;

    const descendo = evento.deltaY > 0;
    const proximo = anoAtual + (descendo ? 1 : -1);

    // Nas pontas (2026 subindo, 2023 descendo) a página volta a rolar normalmente.
    if (proximo < 0 || proximo >= totalAnos) return;

    evento.preventDefault();
    if (animando) return;

    animando = true;
    const margemTopo = parseFloat(getComputedStyle(secaoProjetos).scrollMarginTop);
    if (Math.abs(secaoProjetos.getBoundingClientRect().top - margemTopo) > 10) {
        secaoProjetos.scrollIntoView({ behavior: 'smooth' });
    } else {
        irParaAno(proximo);
    }
    setTimeout(() => { animando = false; }, 900);
}, { passive: false });
