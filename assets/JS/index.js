let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

//REFERNCIAS DEL HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const contador = document.querySelectorAll('small')
const divCartasJugador = document.querySelector('#jugadorCartas');
const divCartasComputadora = document.querySelector('#computadoraCartas');
// funcion para crear un nueva baraja
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }
}
crearDeck();
console.log(deck);


// funcion para pedir una carta
/*const pedirCarta = () => {

    if (deck.lentgh === 0) {
        throw 'No hay cartas en el deck';
    }
    //console.log(deck);
    const carta = deck.pop();
   console.log(deck)
    return carta;
}
pedirCarta();
*/

// Función para obtener un índice aleatorio
const obtenerIndiceAleatorio = (max) => {
    return Math.floor(Math.random() * max);
}

// Función para obtener una carta aleatoria del deck
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const indiceAleatorio = obtenerIndiceAleatorio(deck.length);
    const carta = deck.splice(indiceAleatorio, 1)[0];
    return carta;
}
pedirCarta();

// Valor Carta();
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}
valorCarta(pedirCarta());


//Eventos PARA PEDIR CARTA, SUMAR PUNTOS Y CREAR IMAGEN DE LA CARTA
btnPedir.onclick = () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    contador[0].innerHTML = puntosJugador;
    console.log(puntosJugador);

    //creando imagen de la carta
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('perdiste');
        btnPedir.disabled = true;//metodo para desabilitar el boton
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
}
//turno de la computadora
const turnoComputadora = (PuntosMinimos) => {
    do{
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    contador[1].innerText = puntosComputadora;
    //creando imagen de la carta
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasComputadora.append(imgCarta);

    if(PuntosMinimos > 21){
        break;
    }
    
    }while((puntosComputadora < PuntosMinimos) && (PuntosMinimos <= 21));

    setTimeout(() => {
        if(puntosComputadora === puntosJugador){
            alert('Nadie gana');
        }else if(puntosJugador > 21){
            alert('Computadora gana');
        }else if(puntosComputadora > 21){
            alert('Jugador gana');
        }else{
            alert('Computadora gana');
        }
    }   , 1000);
}

//EVENTO PARA DETENER EL JUEGO
btnDetener.onclick = () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);

}

btnNuevo.onclick = () => {
    console.clear();
    deck = [];
    crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    contador[0].innerText = 0;
    contador[1].innerText = 0;
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;
}





