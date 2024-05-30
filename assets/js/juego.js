/**
 * 2c = Two of Clubs
 * 2D = Two of Diamons
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

//? Patron Modulo, funcion anonima, permite proteger el codigo
const miModulo = (() => {
    'use strick'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];
    
    /* let puntosJugador = 0,
        puntosComputadora = 0; */  
    
    let puntosJugadores = [];
    
    // Referencias HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHtml = document.querySelectorAll('small');

    // Esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
           puntosJugadores.push(0);            
        }
    
        puntosHtml.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerText = '');
    
        btnDetener.disabled = false;
        btnPedir.disabled = false;
    }
    
    // Esta funcion crea un nuevo deck
    const crearDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push( i + tipo);
            }
        }
    
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
    
        //console.log( deck );
        //deck = _.shuffle(deck);
        //console.log( deck );
        return  _.shuffle(deck);
    }
    
    // Esta funcion me permite tomar una carta
    
    const pedirCarta = () => {
    
        if (deck.length === 0) {
            throw 'No hay cartas en el deck'
        }
    
       // const carta = deck.pop();
    
        /* console.log(deck);
        console.log(carta); */ //carta debe ser de la baraja
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
                (valor === 'A') ? 11 : 10
                : valor * 1;
        
        /* let puntos = 0;
        OTRA FORMA
        puntos = (isNaN(valor)) ?
        puntos = (valor === 'A') ? 11 : 10
        : puntos = valor * 1;
    
        console.log(puntos); */
    }

    // Turnio: 0 = primer jugador y el ultimo sera la IA
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerHTML = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        //?callback funcion q se manda como argumento
    
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('No ha ganado nadie :( ');        
            } else if (puntosMinimos > 21) {
                alert('Ganador IA');
            } else if(puntosComputadora > 21){
                alert('Felicidades. Has ganado :) ');
            } else{
                alert('Ganador IA');
            }
        }, 100);
    }
    
    // Turno de la IA    
    const turnoIA = (puntosMinimos) => {

        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);   
    
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));        

        determinarGanador();
    }
   
    // EVENTOS
    
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
    
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);
    
        if (puntosJugador > 21) {
            console.warn('Has perdido!!')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoIA(puntosJugador);
    
        } else if(puntosJugador === 21) {
            console.warn('21, Genial!!')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoIA(puntosJugador);
        }
    
    });
    
    btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoIA(puntosJugadores[0]);
    });
    
    /* btnNuevo.addEventListener('click', () => {
    
        inicializarJuego();        
    }); */

    //? Funcion publica sera visible desde el document (consola)
    return {
        nuevoJuego: inicializarJuego
    };

})();

/* USE STRICT  indica que el código o parte de esté, debe ejecutarse previniendo que se tomen ciertas acciones erróneas 
o malos hábitos de programación y de esta manera arrojando más excepciones */

