/**
 * Labyrinth generator using Eller's algorithm: http://www.neocomputer.org/projects/eller.html
 *  russian text: https://m.habr.com/ru/post/176671/
 *
 * Data saved to global square two-dimensional array Labyrinth[N][M]
 * Every row is stored in Labyrinth[N] sub-array where N = 0..[SIZE-1]
 * Every cell in row is stored in Labyrinth[N][M] cell-object
 * Every cell-object has the following structure:
 * {
 *    rWall: true/false, // the right wall
 *    bWall: true/false, // the bottom wall
 *    value: 0 // cell value for the future use
 *  }
 *
 */

"use strict";

const SIZE = 10;

let row;  // Current row
let sets;  // Sets indexer. If sets[K][M] == 1, then row[M] cell has value = K
let newValue;  // Use this to create new unique value
let labyrinth = []; // The Labyrinth

// Creates new labyrinth
function labGen() {

    row = null;
    newValue = 0;

    // Generate all rows except the last one
    for(let N = 0; N < SIZE-1; N++) {
        genRow(); // generate the row with Eller's algorithm
        labyrinth.push(JSON.parse(JSON.stringify(row)));
    }

    // Generate last row
    genRow();
    genLastRow();
    labyrinth.push(JSON.parse(JSON.stringify(row)));

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            (labyrinth[i][j].bWall === 0) ? labyrinth[i][j].bWall = false : labyrinth[i][j].bWall = true;
            (labyrinth[i][j].rWall === 0) ? labyrinth[i][j].rWall = false : labyrinth[i][j].rWall = true;
            labyrinth[i][j].value = 0;
        }
    }

    return labyrinth;

// Row generator
    function genRow() {
        // Step 1: get previous row and prepare it as new
        if (row == null || row.length === 0) {
            row = [];
            for (let M = 0; M < SIZE; M++) {
                row[M] = {
                    rWall: 0,
                    bWall: 0,
                    value: null
                };
            }
            sets = []; // remove all sets
        } else { // Prepare next row from last one
            for (let M = 0; M < SIZE; M++) {
                row[M].rWall = 0; // Remove right walls
                if (row[M].bWall !== 0) { // If the cell has bottom wall...
                    sets[row[M].value][M] = null; // ...remove it from the set...
                    row[M].value = null;
                    row[M].bWall = 0; // ...and remove the bottom wall
                }
            }
        }

        // Step 2: sets unique value: to each cell when its value == null
        for (let M = 0; M < SIZE; M++) {
            if (row[M].value == null) {
                row[M].value = newValue++;
                if (!sets[row[M].value]) sets[row[M].value] = [];
                sets[row[M].value][M] = 1;
            }
        }

        // Step 3: randomly set rWall, if no - combine the sets to left one
        for (let M = 0; M < SIZE-1; M++) { // now look at the pairs row[M] and row[M+1]
            if (row[M].value === row[M+1].value) { // we must add the wall between the cells if right and left values are the same
                row[M].rWall = 1;
            } else {
                const random = Math.random();
                if (random > 0.5) { // set rWall
                    row[M].rWall = 1;
                } else { // combine the values
                    const oldValue = row[M+1].value;
                    for (let k = 0; k < sets[oldValue].length; k++) {
                        if (sets[oldValue][k] != null) {
                            row[k].value = row[M].value;
                            sets[row[M].value][k] = 1;
                            sets[oldValue][k] = null;
                        }
                    }
                }
            }
        }
        row[SIZE-1].rWall = 1; // set the last right wall

        // Step 4: create bottom walls
        for (let k = 0; k < sets.length; k++) {
            // Create array from every set (we don't interesting of set number)
            let cells = []; // array of indexes of the cells with the same value
            if (sets[k] != null) {
                const aset = sets[k].slice();
                for (let i = 0; i < aset.length; i++) {
                    if (aset[i] != null) cells.push(i);
                }
                // Get the number of bwalls as random between 1 and cells length - 1 (at least one cell shouldn't has bWall)
                if (cells.length < 2) continue; // We don't need to set bottom walls in this case
                const numOfBWalls = Math.floor(cells.length * Math.random()); // Random between 0 and cells.length - 1
                // Now get numOfWalls random indexes of the cells with the same value and set bottom wall in these cells
                let indexes = [];
                let length = cells.length;
                for (let i = 0; i < numOfBWalls; i++) {
                    let n = Math.floor(Math.random() * length); // next 'lucky' cell
                    indexes.push(cells[n]);
                    cells[n] = cells[--length]; // here we move the last index to the plase of 'lucky' one and short our index list at one
                }
                // Setting the bottom walls now!
                for (let i = 0; i < indexes.length; i++) {
                    row[indexes[i]].bWall = 1;
                }
            }
        }
    }

// Last row generator
    function genLastRow() {
        for (let M = 0; M < SIZE-1; M++) {
            row[M].bWall = 1; // Every cell has the bottom wall

            // Drop walls between the cells with different values and combine the sets ov values to one
            if (row[M].value !== row[M+1].value && row[M].rWall !== 0) {
                row[M].rWall = 0;
                let oldValue = row[M+1].value;
                let newValue = row[M].value;
                for (let k = M+1; k < SIZE; k++) {
                    if (row[k].value === oldValue) {
                        row[k].value = newValue;
                    }
                }
            }
        }
        row[SIZE-1].bWall = 1; // Set last bottom wall
    }
}
