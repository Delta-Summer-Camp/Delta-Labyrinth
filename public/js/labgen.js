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

const SIZE = 50; // size of the Labyrinth

// cell prototype
/*
let cell = {
    rWall: false, // the right wall
    bWall: false, // the bottom wall
    value: 0 // future
*/

const labyrinth = [];

function labGen () {
    for (let N = 0; N < SIZE; N++) {
        labyrinth.push(genRow());
    }
    function genRow() {
        let row = [];
        for (let M = 0; M < SIZE; M++) {
            let cell = {
                rWall: Math.random() < 0.5, // the right wall
                bWall: Math.random() < 0.5, // the bottom wall
                value: 0 // future
            }
            row.push(cell);
        }

        return row;
    }
}