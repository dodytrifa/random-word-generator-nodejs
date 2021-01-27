'use strict'
import { words } from './data.js'

class Boogle {
    constructor() {
        this.clue = words
        this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }

    shake(num) {
        let grid = [];
        for (let i = 0; i < num; i++) {
            let innerArr = [];
            for (let i = 0; i < num; i++) {
                let shuffle = Math.floor(Math.random() * this.letters.length);
                innerArr.push(this.letters[shuffle]);
            }
            grid.push(innerArr);
        }
        this.grid = grid;
        console.log(this.grid);
    }

    list(multiArr, array) {
        let item = array.toString();
        return multiArr.some(arr => item === arr.toString());
    }

    search(arr, word) {
        let index = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] === word[0]) {
                    index.push([[i, j]]);
                }
            }
        }

        while (index.length > 0) {
            let trace = index.pop();
            if (trace.length === word.length) {
                return true;
            }

            let [a, b] = trace[trace.length - 1];
            for (let k = -1; k <= 1; k++) {
                for (let m = -1; m <= 1; m++) {
                    if (k === 0 && m === 0) {
                    }
                    let step = a + k;
                    let step2 = b + m;

                    if ((arr[step] || [])[step2] === word[trace.length] && !this.list(trace, [[step, step2]])) {
                        index.push(trace.slice().concat([[step, step2]]));
                    }
                }
            }
        }
        return false;
    }

    display(arr, clue) {
        return clue.filter(word => this.search(arr, word)).sort((a, b) => a.length === b.length ? a.localeCompare(b) : b.length - a.length);
    }

    solve() {
        let clue = this.clue;
        let grid = this.grid;
        let output = this.display(grid, clue);
        console.log(`${output.length} words found :`);
        console.log(output.join("\n"));
    }
}

let start = new Boogle()

start.shake(4)
start.solve()
