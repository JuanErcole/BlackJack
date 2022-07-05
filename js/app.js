

(() =>{
    'use strict'
    let baraja =[];
    const palos =['C', 'D', 'H', 'S'],
          altas =['A', 'J', 'Q', 'K'];

    //let playerPoints = 0,
        //bancaPoints = 0;

    let puntosJugadores = [];

    //REFERENCIAS HTML -.-.-.-.-.-.-.-.-.-
    const btnPedir   = document.querySelector('.btn_pedir'),
          btnDetener = document.querySelector('.btn_stop'),
          btnNuevo   = document.querySelector('.btn_new');

    const divCartasJugador = document.querySelector('#cartasPlayer'),
          divCartasComputadora = document.querySelector('#cartasBanca');

    const small = document.querySelectorAll('small');

    // Esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) =>{
        baraja = crearBaraja();
        for(let i = 0; i < puntosJugadores; i++){
            puntosJugadores.push(0)
        }
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

    crearBaraja();

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

    // turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        do {
            const carta = pedirCarta();

            bancaPoints = bancaPoints + valorCarta( carta );
            small[1].innerText = bancaPoints;
            
            // <img class="carta" src="assets/cartas/2C.png">
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
            imgCarta.classList.add('carta');
            divCartasComputadora.append( imgCarta );

            if( puntosMinimos > 21 ) {
                break;
            }

        } while(  (bancaPoints < puntosMinimos)  && (puntosMinimos <= 21 ) );

        setTimeout(() => {
            if( bancaPoints === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana')
            } else if( bancaPoints > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100 );
    }

    //EVENTOS ========
    btnPedir.addEventListener('click', () =>{

        const carta = pedirCarta();

        playerPoints += valorCarta(carta);
        small[0].innerText = playerPoints;

        // <img class="carta" src="assets/cartas/2C.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);
        
        if (playerPoints > 21){
            console.log('You lose');
            btnPedir.disabled = true;
            turnoComputadora(playerPoints);
            btnPedir.disabled = true;
            btnDetener.disabled = true;
        }else if(playerPoints === 21){
            console.warn('¡¡BLACKJACK!!')
            turnoComputadora(playerPoints);
            btnPedir.disabled = true;
            btnDetener.disabled = true;
        }

    });


    btnDetener.addEventListener('click', ()=>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(playerPoints);
    } )

    btnNuevo.addEventListener('click', () => {

        console.clear();
        /* baraja = [];
        baraja = crearBaraja(); */
        inicializarJuego();

        playerPoints = 0;
        bancaPoints  = 0;
        
        small[0].innerText = 0;
        small[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled   = false;
        btnDetener.disabled = false;

    });
})()





 









