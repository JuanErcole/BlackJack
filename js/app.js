const miModulo = (() =>{
    'use strict'
    let baraja =[];
    const palos =['C', 'D', 'H', 'S'],
          altas =['A', 'J', 'Q', 'K'];

    
    let puntosJugadores = [];

    //REFERENCIAS HTML -.-.-.-.-.-.-.-.-.-
    const btnPedir   = document.querySelector('.btn_pedir'),
          btnDetener = document.querySelector('.btn_stop'),
          btnNuevo   = document.querySelector('.btn_new');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          small = document.querySelectorAll('small');


    // Esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) =>{
        baraja = crearBaraja();

        puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0)
        }

        small.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
         
        btnPedir.disabled   = false;
        btnDetener.disabled = false;

    }

    //Esta funcion crea un nuevo maso mezclado
    const crearBaraja = () =>{
        
        baraja = [];
        for(let i = 2; i <= 10; i++){
            for(let palo of palos){
                baraja.push( i + palo);
            }
        }

        for(let palo of palos ){
            for( let alta of altas){
                baraja.push( alta + palo )
            }
        }
        return _.shuffle(baraja);
    }

    // Esta función me permite tomar una carta
    const pedirCarta = () =>{
        if ( baraja.length === 0 ) {
            throw 'No hay cartas en el mazo';
        } 
        return baraja.pop(); 
    }

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ? 
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
    } 

    //Turno 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) =>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        small[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    } 

    const crearCarta = (carta, turno) =>{

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana')
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100 );

    }

    // turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

        determinarGanador();
    }



    //EVENTOS ========
    btnPedir.addEventListener('click', () =>{

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );
        
        crearCarta(carta, 0);
        

        if (puntosJugador > 21){
            console.log('You lose');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        }else if(puntosJugador === 21){
            console.warn('¡¡BLACKJACK!!')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });


    
    btnNuevo.addEventListener('click', () => {
        
        inicializarJuego();
        
    });
    
    btnDetener.addEventListener('click', ()=>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    } )
    return {
        nuevoJuego: inicializarJuego
    }; 

})()





 









