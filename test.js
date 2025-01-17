var test = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
];

function findNextEmpty(grid){
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (grid[i][j] == 0){
                return [i,j];
            }
        }
    }
    //there are no empty spots
    return [9,9];
}

function isValid(grid, row, col, val){
    
    if(grid[row].includes(val)){
        return false;
    }

    for (var i = 0; i < 9; i++){
        if (grid[i][col] == val){
            return false;
        }
    }

    var horSubSet = Math.floor(col / 3);
    var vertSubSet =  Math.floor(row / 3);
    
    var horSubStart = horSubSet * 3;
    var vertSubStart = vertSubSet * 3;

    for (var i = 0; i < 3; i++){
        for (var j = 0; j < 3; j++){
            if (grid[vertSubStart + i][horSubStart + j] == val){
                return false;
            }
        }
    }

    return true;

}

function solveGrid(grid, row, col){
    if(row > 8){
        return true;
    }

    for(var i = 1; i <= 9; i++){
        if (isValid(grid, row, col, i)){
            grid[row][col] = i;
            var emptySpot = findNextEmpty(grid);

            if (solveGrid(grid, emptySpot[0], emptySpot[1])){
                return true;
            }

            grid[row][col] = 0;
        }
    }

    return false;
}

function displaySudokuHTML(grid){
    var arrayAsString = "";
    for(var i = 0;i < 9; i++){
        for (var j = 0; j < 9; j++){
            arrayAsString += grid[i][j] + " ";
        }
        arrayAsString += "\n";
    }
    var para = document.createElement("P");
    para.innerText = arrayAsString;
    document.body.appendChild(para);

    console.log(arrayAsString);
}

//displaySudokuHTML(test);
var start = findNextEmpty(test);
if(solveGrid(test, start[0], start[1])){
    displaySudokuHTML(test);
}else {
    console.log("nope");
}

