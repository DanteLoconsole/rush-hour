// VB_LEVEL + LEVEL 1-4
let board_vb = [['L2', 'R2', 'B6', '/0', 'L9',  'R9' ],
                ['L3', 'R3', 'O6', '/0', 'B10', '/0' ],
                ['B4', 'L1', 'T1', 'R1', 'O10', '/0'],
                ['M4', 'L7', 'T7', 'R7', '/0', 'B11'],
                ['O4', '/0', '/0', 'B8', '/0',  'O11'],
                ['L5', 'R5', '/0', 'O8', 'L12',  'R12']];

let board_1 = [['L3', 'R3', 'B7', 'B9', '/0', '/0'],
               ['L2', 'R2', 'O7', 'M9', '/0', '/0'],
               ['B6', 'L1', 'R1', 'O9', '/0', '/0'],   //Interne voorstelling van het spelbord als een tweedimensionale lijst
               ['M6', 'L4', 'T4', 'R4', '/0', '/0'],
               ['O6', 'L5', 'R5', '/0', '/0', '/0'],   // L=links, T=tussen, R=rechts, B=boven, M=midden, O=onder
               ['L8', 'T8', 'R8', '/0', '/0', '/0']];

let board_2 = [['/0', 'B4', '/0', 'L7', 'T7',  'R7' ],
               ['B2', 'O4', '/0', 'B8', 'B10', '/0' ],
               ['O2', 'L1', 'R1', 'O8', 'M10', 'B11'],
               ['B3', 'L5', 'T5', 'R5', 'O10', 'O11'],
               ['O3', '/0', 'B6', '/0', '/0',  'B12'],
               ['/0', '/0', 'O6', 'L9', 'R9',  'O12']];

let board_3 = [['B2', '/0', '/0', 'L6',  'T6',  'R6' ],
               ['O2', 'L3', 'R3', 'B7',  '/0',  '/0' ],
               ['L1', 'R1', 'B4', 'O7',  '/0',  'B11'],
               ['/0', '/0', 'O4', 'L8',  'R8',  'M11'],
               ['/0', '/0', 'B5', 'L9',  'R9',  'O11'],
               ['/0', '/0', 'O5', 'L10', 'T10', 'R10']];

let board_4 = [['L2', 'R2', 'B6', '/0', 'L9',  'R9' ],
               ['L3', 'R3', 'O6', '/0', 'B10', '/0' ],
               ['B4', '/0', 'L1', 'R1', 'M10', '/0'],
               ['M4', 'L7', 'T7', 'R7', 'O10', 'B11'],
               ['O4', '/0', '/0', 'B8', '/0',  'O11'],
               ['L5', 'R5', '/0', 'O8', 'L12',  'R12']];


// ALS PAGINA INGELADEN WORDT
window.onload = function(){
    uitvoer(board_1);
}
function uitvoer(board){
    active_board = JSON.parse(JSON.stringify(board));
    current_board = JSON.parse(JSON.stringify(board));
    confetti_bezig = false;

    draw_board(board);
    my_timer = [0,0];
    draw_timer(my_timer);
    inter = setInterval(verhoogTime, 1000);
    my_moves = 0;
    draw_moves(my_moves);
}

// SPELBORD
function draw_board(board){
    let board_html = generate_board_html(board);
    document.getElementById("playboard").innerHTML = board_html;
}
function generate_board_html(board){
    let table_inner_html = "";
    for(let i = 0; i < board.length; i++){  // itereren over rijen
        let row_html = "<tr>";
        for(let j = 0; j < board[i].length; j++){  // itereren over kolommen
            row_html += generate_cell(board[i][j]);  // stond eerst extra parameters
        }
        row_html += "</tr>";
        table_inner_html += row_html;
    }
    return `<table>${table_inner_html}</table>`;
}
function generate_cell(type){  // stonden eerst extra parameters
    var kleur = {
        "1": "red",
        "2": "blue",
        "3": "yellow",
        "4": "green",
        "5": "orange",
        "6": "purple",
        "7": "silver",
        "8": "pink",
        "9": "aqua",
        "10": "brown",
        "11": "gray",
        "12": "gold"
      };
    let cell_class = "leeg";
    let cell_inner = "";
    
    if(type.slice(1) == 0){
        cell_class = "leeg";
    }
    else{
        cell_class = `auto ${kleur[type.slice(1)]} pos_${type[0]}`;
    }

    if(type[0] == "L"){
        cell_inner = `<button class= "${kleur[type.slice(1)]} move_butt"><</button>`;
    }
    if(type[0] == "R"){
        cell_inner = `<button class= "${kleur[type.slice(1)]} move_butt">></button>`;
    }
    if(type[0] == "B"){
        cell_inner = `<button class= "${kleur[type.slice(1)]} move_butt">⌃</button>`;
    }
    if(type[0] == "O"){
        cell_inner = `<button class= "${kleur[type.slice(1)]} move_butt">⌄</button>`;
    }

    return `<td class="${cell_class}" onclick="move_${type[0]}(this)">${cell_inner}</td>`;
}

// TIMER
function draw_timer(timer){
    let timer_html = timer[0] + "m " + timer[1] + "s";
    document.getElementById("timer").innerHTML = timer_html;
}
function verhoogTime(){
    if(my_timer[1] == 59){
        my_timer[0] += 1;
        my_timer[1] = 0;
    }
    else{
        my_timer[1] += 1;
    }
    draw_timer(my_timer);
}

// ZETTEN-TELLER
function draw_moves(moves){
    moves_html = moves;
    document.getElementById("moves").innerHTML = moves_html;
    last_car = "0";
}

// VERPLAATSEN VAN AUTO
function move_L(cell){
    let col = cell.cellIndex;
    let row = cell.parentNode.rowIndex;
    let klad = current_board[row][col];
    let current_car = current_board[row][col].slice(1);
    if(current_board[row][col-1]=="/0"){
        if(current_car != last_car){
            draw_moves(my_moves += 1);
            last_car = current_car;
        }
        current_board[row][col] = "/0";
        current_board[row][col-1] = klad;
        draw_board(current_board);
        if(current_board[row][col+1].slice(1) == current_board[row][col-1].slice(1)){
            klad = current_board[row][col+1];
            current_board[row][col+1] = "/0";
            current_board[row][col] = klad;
            draw_board(current_board);
            if(current_board[row][col+2].slice(1) == current_board[row][col-1].slice(1)){
                klad = current_board[row][col+2];
                current_board[row][col+2] = "/0";
                current_board[row][col+1] = klad;
                draw_board(current_board);
            }
        }
    }
    check_game_complete();
}
function move_R(cell){
    let col = cell.cellIndex;
    let row = cell.parentNode.rowIndex;
    klad = current_board[row][col];
    let current_car = current_board[row][col].slice(1);
    if(current_board[row][col+1]=="/0"){
        if(current_car != last_car){
            draw_moves(my_moves += 1);
            last_car = current_car;
        }
        current_board[row][col] = "/0";
        current_board[row][col+1] = klad;
        draw_board(current_board);
        if(current_board[row][col-1].slice(1) == current_board[row][col+1].slice(1)){
            klad = current_board[row][col-1];
            current_board[row][col-1] = "/0";
            current_board[row][col] = klad;
            draw_board(current_board);
            if(current_board[row][col-2].slice(1) == current_board[row][col+1].slice(1)){
                klad = current_board[row][col-2];
                current_board[row][col-2] = "/0";
                current_board[row][col-1] = klad;
                draw_board(current_board);
            }
        }
    }
    check_game_complete();
}
function move_B(cell){
    let col = cell.cellIndex;
    let row = cell.parentNode.rowIndex;
    let klad = current_board[row][col];
    let current_car = current_board[row][col].slice(1);
    if(current_board[row-1][col]=="/0"){
        if(current_car != last_car){
            draw_moves(my_moves += 1);
            last_car = current_car;
        }
        current_board[row][col] = "/0";
        current_board[row-1][col] = klad;
        draw_board(current_board);
        if(current_board[row+1][col].slice(1) == current_board[row-1][col].slice(1)){
            klad = current_board[row+1][col];
            current_board[row+1][col] = "/0";
            current_board[row][col] = klad;
            draw_board(current_board);
            if(current_board[row+2][col].slice(1) == current_board[row-1][col].slice(1)){
                klad = current_board[row+2][col];
                current_board[row+2][col] = "/0";
                current_board[row+1][col] = klad;
                draw_board(current_board);
            }
        }
    }
    check_game_complete();
}
function move_O(cell){
    let col = cell.cellIndex;
    let row = cell.parentNode.rowIndex;
    let klad = current_board[row][col];
    let current_car = current_board[row][col].slice(1);
    if(current_board[row+1][col]=="/0"){
        if(current_car != last_car){
            draw_moves(my_moves += 1);
            last_car = current_car;
        }
        current_board[row][col] = "/0";
        current_board[row+1][col] = klad;
        draw_board(current_board);
        if(current_board[row-1][col].slice(1) == current_board[row+1][col].slice(1)){
            klad = current_board[row-1][col];
            current_board[row-1][col] = "/0";
            current_board[row][col] = klad;
            draw_board(current_board);
            if(current_board[row-2][col].slice(1) == current_board[row+1][col].slice(1)){
                klad = current_board[row-2][col];
                current_board[row-2][col] = "/0";
                current_board[row-1][col] = klad;
                draw_board(current_board);
            }
        }
    }
    check_game_complete();
}

// NAAR ANDER LEVEL GAAN
function gotolvl_vb(){
    if (JSON.stringify(active_board) != JSON.stringify(board_vb)){
        document.getElementById("active").removeAttribute("id");
        document.getElementsByClassName("vb_level")[0].setAttribute('id','active');
        reset(board_vb);
    }
}
function gotolvl1(){
    if (JSON.stringify(active_board) != JSON.stringify(board_1)){
        document.getElementById("active").removeAttribute("id");
        document.getElementsByClassName("level1")[0].setAttribute('id','active');
        reset(board_1);
    }
}
function gotolvl2(){
    if (JSON.stringify(active_board) != JSON.stringify(board_2)){
        document.getElementById("active").removeAttribute("id");
        document.getElementsByClassName("level2")[0].setAttribute('id','active');
        reset(board_2);
    }
}
function gotolvl3(){
    if (JSON.stringify(active_board) != JSON.stringify(board_3)){
        document.getElementById("active").removeAttribute("id");
        document.getElementsByClassName("level3")[0].setAttribute('id','active');
        reset(board_3);
    }
}
function gotolvl4(){
    if (JSON.stringify(active_board) != JSON.stringify(board_4)){
        document.getElementById("active").removeAttribute("id");
        document.getElementsByClassName("level4")[0].setAttribute('id','active');
        reset(board_4);
    }
}

// RESETTEN
function reset(board=active_board){
    if(confetti_bezig){
        stopConfetti();
        confetti_bezig = false;
    }
    clearInterval(inter);
    uitvoer(board);
}

// Als rode auto voor de EXIT staat => Level voltooid
function check_game_complete(){
    if(current_board[2][5] == "R1"){
        clearInterval(inter);
        startConfetti();
        confetti_bezig = true;
        setTimeout(function(){
            alert("Proficiat, je hebt dit level voltooid!\n\nVerstreken tijd: " + my_timer[0] + " min " + my_timer[1] + " sec" + "\nAantal zetten: " + my_moves);
        }, 50);
    }
}