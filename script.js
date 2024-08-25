/*
    !! DISCLAIMER !!

Le uniche cose che non abbiamo affrontato a lezione sono gli Array,
e la creazione e utilizzo di funzioni, se non sbaglio.

La griglia è stata fatta con degli array, uno tanti quante sono le righe, e ogniuno è un array di
elementi (numeri nel nostro caso, che andremo a pescare tramite indici).

Non ho utilizzato il ciclo ForEach, ma ho sempre usato 2 cicli For innestati

Ogni riga che presenta un commento di questo tipo: £ , è inutile ai fini del programma, serve solo a mostrare 
in console un messaggio con qualcosa, utile forse a decifrare che caspio sta succedendo.

*/

// Prep

// Recupero elementi dal DOM
const gameContainer = document.getElementById('gameContainer');
const btnGo = document.getElementById('go');
const btnStop = document.getElementById('stop');

// Preparazione variabili note
let grid = [];          // riempita di array, rappresenterà per i calcoli gli stati delle celle della griglia
let nextGrid = [];     
const max = 2;          // serve per far oscillare il numero random tra 0 e max(escluso)
const rows = 20;        // was 20
const cols = 20;        // was 20
let flux;

// Funzioni

function reset() {   // Riempio di zeri la grid, non ancora utilizzata
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            grid[i][j] = 0;
        }
    }
}

function setupRandom() {  // Riempio griglia con zeri e uni casuali
    for (let i = 0; i < rows; i++) {
        //console.log('row', i);        // £
        let row = [];
        for (let j = 0; j < cols; j++) {
            row[j] = Math.floor(Math.random() * max);  // assegno un numero tra 0 e 1, arrotondato
        }
        grid[i] = row;
        //console.log('valori', row);   // £
    }
    renderGrid();    
}

function renderGrid() {  // Per ogni elemento della griglia, creo un <li> in pagina, con una classe per lo stato
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] == 0) gameContainer.innerHTML += `<li class='dead'></li>`; // aggiungo dead or alive class
            else gameContainer.innerHTML += `<li class='alive'></li>`;
        } 
    }    
}

function renderThisGrid() {
    let gameContainerNodes = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] == 0) gameContainerNodes += `<li class='dead'></li>`; // aggiungo dead or alive class
            else gameContainerNodes += `<li class='alive'></li>`;
        }
        
    }
    gameContainer.innerHTML = gameContainerNodes;
}

function countNeighbors(x, y) {   // Conto i vicini vivi
            
            let sum = 0;
            // Da Cambiare con 2 cicli for tra i-1 i+1 , tranne il caso i=0 && j=0

            for (let i = -1; i < 2; i++) {
                for (let j = -1; i < 2; j++) {
                    if(!(i == 0 && j == 0)) {
                        if (grid[x+i][y+j] == 1) sum++;
                        console.log('ciao', x, 'x', i, 'i', y, 'y', j, 'j');
                    }
                }
            }

            //if (grid[x-1][y-1] == 1 ) sum = sum + 1;
            //console.log('step1:', sum,'x' ,x, x-1,'y', y, y-1);      // £
            //console.log('cosa legge nella cella:', grid[x-1][y-1]);  // £

            //if (grid[x-1][y] == 1 ) sum = sum + 1;
            //console.log('step2:', sum,'x' ,x, x-1,'y', y, y);        // £
            //console.log('cosa legge nella cella:', grid[x-1][y]);    // £

            //if (grid[x-1][y+1] == 1 ) sum = sum + 1;
            //console.log('step3:', sum,'x' ,x, x-1,'y', y, y+1);      // £
            //console.log('cosa legge nella cella:', grid[x-1][y+1]);  // £

            //if (grid[x][y-1] == 1 ) sum = sum + 1;
            //console.log('step4:', sum,'x' ,x, x,'y', y, y-1);        // £
            //console.log('cosa legge nella cella:', grid[x][y-1]);    // £

            //if (grid[x][y+1] == 1 ) sum = sum + 1;
            //console.log('step5:', sum,'x' ,x, x,'y', y, y+1);        // £
            //console.log('cosa legge nella cella:', grid[x][y+1]);    // £

            //if (grid[x+1][y-1] == 1 ) sum = sum + 1;
            //console.log('step6:', sum,'x' ,x, x+1,'y', y, y-1);      // £
            //console.log('cosa legge nella cella:', grid[x+1][y-1]);  // £
            
            //if (grid[x+1][y] == 1 ) sum = sum + 1;
            //console.log('step7:', sum,'x' ,x, x+1,'y', y, y);        // £
            //console.log('cosa legge nella cella:', grid[x+1][y]);    // £

            //if (grid[x+1][y+1] == 1 ) sum = sum + 1;
            //console.log('step8:', sum,'x' ,x, x+1,'y', y, y+1);      // £
            //console.log('cosa legge nella cella:', grid[x+1][y+1]);  // £

            return sum;
}

function applayRules(sum, i, j) {   // Regole del gioco
    if (grid[i][j] == 1) {
        if (sum < 2 || sum > 3) return 1;
        else return 0;
    } else {
        if (sum == 3) return 1;
        else return 0;
    }  
}

function godzilla(sum, i, j) {     // Regole di gioco, scritte in altra maniera.
    if (grid[i][j] == 0 && sum == 3) return 1;
    else if (grid[i][j] == 1 && (sum < 2 || sum > 3))
        return 0;
    else return grid[i][j];
}

function copyOldGrid (grid, nextGrid) {
    console.log(grid);
    for (let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; i++) {            
            nextGrid.push(grid[i][j]);
        }
    }
    return nextGrid;
}

function copyNextGen(nextGrid, grid) {
    for (let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; i++) {
            grid.push(nextGrid[i][j]);
        }
    }
    return grid;
}

function nextGen() {      // Si genera la Generazione successiva

    nextGrid = structuredClone(grid);              // La successiva griglia diventa uguale a quella attuale
    //nextGrid = copyOldGrid(grid, nextGrid);      // La successiva griglia diventa uguale a quella attuale
    
    //console.log('ciao dentro a nextGen prima di cicli');  // £
    //console.log(grid);                                    // £

    for (let i = 1; i < (rows - 1); i++) {
        for( let j = 1; j < (cols - 1); j++) {
            sum = countNeighbors(i, j);
            //console.log('contenuto:', grid[i][j], 'riga:', i, 'colonna:', j, 'count:', sum); // £
            //console.log(nextGrid[i][j], ':cella nextGrid prima rules');                      // £
            nextGrid[i][j] = godzilla(sum, i, j);
            //console.log(nextGrid[i][j], ':cella nextGrid dopo rules');                       // £          
        } 
    }
    //console.log('griglia nuova finiti i cicli ma prima di return', nextGrid);                // £
    //console.log('grid PRIMA di structuredClone',grid);                                       // £
    grid = structuredClone(nextGrid);
    // la Nuova griglia di ora sarà la Vecchia griglia per la Generazione successiva                                                        
    //console.log('grid DOPO structuredClone', grid);                                          // £
    renderThisGrid(nextGrid);
    //Aggiorno nel DOM la successiva generazione
}  
/*
Nella funzione nextGen, per fetchare escludendo fin da subito i bordi (che non hanno tutti i vicini,
per il momento, finchè non si wrapperanno i bordi) faccio partire entrambe le variabili di controllo
(i per il primo, j per il secondo) dei For da 1, cosi da escludere gli indici 0 della PRIMA riga o della
PRIMA colonna, e l'uscita è condizionata da rows-1 e cols-1, cosi da fermarci sempre agli indici 18, prima di 
raggiungere l'ULTIMA colonna o riga.
*/


// Flusso di Esecuzione

//console.log('ciao per prima cosa');
//console.log('dopo ciao', grid);

setupRandom();   // dentro a setupRandom, la griglia effettivamente viene renderizzata giusta

console.log('execute setupRandom');
//console.log(grid);  // qui mostra già un'altra griglia

//renderGrid(grid);  messa poi dentro a setupRandom

//nextGen();  

/* Non solo pare prendere in esame la griglia giusta, ma la somma dei vicini è sbagliata.
Inoltre, dopo qualche modifica da cui non riesco a far ritorno, non modifica nemmeno la nextGrid,
ristampandola uguale a grid (quella sbagliata). */

//console.log('execute nextGen');
//console.log('old grid alla fine:', grid);
//console.log('nextGrid alla fine:', nextGrid);


// La cosa che fa più ridere, è che in tutte le griglie, giuste o sbagliate, all'inizio o
// alla fine, dentro o fuori ad un ciclo , i bordi rimangono SEMPRE uguali.


// I ragionamenti non mi sembrano tanto deviati, il problema starà di sicuro nel creare e richiamare funzioni,
// e nei loro parametri, poi successivamente argomenti. (credo)


// Problemmi principali: la sommatoria dei vicini non prende in esame la griglia giusta, però funziona di per se.
// Gli stati vengono cambiati correttamente all'interno della funzione nextGen, ma non vengono riportati al di 
// fuori dei cicli for, quindi nemmeno fuori dalla funzione.


// Eventi Dinamici di flusso

//GO
btnGo.addEventListener('click',function() {
    flux = setInterval(nextGen, 200);
});

//STOP
btnStop.addEventListener('click', function() {
    clearInterval(flux);
})
