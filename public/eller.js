function mergeSets(leftSetID, rightSetID, numSet, cells) {
    for (let i = 0; i < cells.length; i++){
        if (cells[i].id === rightSetID){
            cells[i].id = leftSetID;
            numSet[rightSetID]--;
            numSet[leftSetID]++;
        }
        if (numSet[rightSetID] === 0)
            break;
    }
}
class Cell {
    constructor() {
        this.bottomWall = false;
        this.rightWall = false; //?????
        this.id = -1;
    }

    connectSet(numSet) { //"connectSet" = add cell to 1st set in array
        if (this.id >= 0)
            return;
        for (let i = 0; i < numSet.length; i++) {
            if (numSet[i] === 0) {
                this.id = i;
                numSet[i]++;
                break;
            }
        }
    }
}
function generateMaze(){
    const canvas = document.getElementById('maze');
    canvas.width  = 256.0;
    canvas.height = 256.0;

    const context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0,0,512,512);

    let numRow = 32;
    let numCol = 32;

    const row = {};
    const numSet = {};

    for (let i = 0; i < numCol; i++){ //init empty row
        numSet.push(0);
        const cell = new Cell();
        row.push(cell);
    }

    for (let i = 0; i < numRow; i++){ // loop until finished
        for (let j = 0; j < row.length; j++){
            row[j].connectSet(numSet);
        }

        for (let j = 0; j < row.length; j++){ // right wall
            if (j === row.length - 1){
                row[j].rightWall = true;
                break;
            }
            if (row[j+1].id === row[j].id){
                row[j].rightWall = true;
            }
            else {
                const addWall = Math.random() >= 0.5;
                row[j].rightWall = addWall;
                if (!addWall){ // IMMEDIATELY invoked function (!, followed by function)
                    mergeSets(row[j].id, row[j+1].id, numSet, row);
                }
            }
        }

        for (let j = 0; j < row.length; j++){ // bottom wall
            let removeWall = Math.random() >= 0.5;
            if (numSet[row[j].id] === 1)
                removeWall = true;
            row[j].bottomWall = !removeWall;
            if (!removeWall)
                numSet[row[j].id] -= 1;
        }

        if (i !== numRow-1){ // next row
            numSet.fill(0, 0, numSet.length-1);
            for (let j = 0; j < row.length; j++){
                row[j].rightWall = false;
                if(row[j].bottomWall)
                    row[j].id = -1;
                else
                    numSet[row[j].id] += 1;
                row[j].bottomWall = true;
            }
        }
        else {
            for (let j = 0; j < row.length; j++){
                row[j].bottomWall = true;
                if (j === row.length - 1){
                    row[j].rightWall = true;
                    break;
                }
                if (row[j+1].id !== row[j].id){
                    row[j].rightWall = false;
                    mergeSets(row[j].id, row[j+1].id, numSet, row);
                }
            }
        }
    }
}