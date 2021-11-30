import fs from 'fs';
import Todo from './Todo.js';


export default class Todos {

    constructor(args) {
        this.args = process.argv.slice(2);

    }

    run() {


        if (this.args.includes('-l')) {
            this.printTodos();
        } else if (this.args.includes('-a')) {
            this.addTodo(this.args.slice(1).join(' '));
        } else if (this.args.includes('-r')) {
            this.removeTodo(this.args[1]);
        } else if (this.args.includes('-c')) {
            this.markDone(this.args[1]);
        } else {
            console.log('\nNem támogatott argumentum!');
            this.printManual();
        }
    }
    // fájl beolvasása

    getList() {

        let list = JSON.parse(fs.readFileSync('todos.json', 'utf8'));;

        for (let i = 0; i < list.length; i++) {
            list[i] = new Todo(list[i].task, list[i].status);
        }
        return (list);
    }



    // tennivalók kilistázása

    printTodos() {
        let list = this.getList();

        console.log('\n')
        if (list.length == 0) {
            console.log('Nincs mára tennivalód! :)')
        }
        for (let i = 0; i < list.length; i++) {
            if (list[i].status == true) {
                list[i].status = " [X]";
            } else {
                list[i].status = " [ ]";
            }
            console.log(i + 1 + '.' + `${list[i].status} ${list[i].task}`);
        }
    }



    // új tennivaló hozzáadása

    addTodo(input) {

        let list = this.getList();
        let inputTask = input;

        if (typeof (inputTask) === 'undefined') {
            console.log("\nNem lehetséges új feladat hozzáadása: nincs megadva a feladat!");
        } else {
            list.push(new Todo(inputTask));
            console.log(list);
            fs.writeFileSync('todos.json', JSON.stringify(list, null, 4));
            console.log(`${inputTask} hozzáadva!`);
        }
        this.printTodos();
    }



    // tennivalók törlése

    removeTodo(input) {

        let list = this.getList();
        let inputNumber = parseInt(input);

        if (isNaN(inputNumber) === true) {
            console.log("\nNem lehetséges az eltávolítás: nem adott meg indexet!");
        } else if (typeof (inputNumber) !== 'number') {
            console.log("\nNem lehetséges az eltávolítás: a megadott index nem szám!");
        } else if (inputNumber < 1 || list.length < inputNumber) {
            console.log("\nNem lehetséges az eltávolítás: túlindexelési probléma adódott!");
        } else {
            for (let i = 0; i < list.length; i++) {
                if (i == inputNumber - 1) {
                    console.log(`'${list[i].task}' el lett távolítva!`);
                    list.splice(i, 1);
                }
            }
            fs.writeFileSync('todos.json', JSON.stringify(list, null, 4));
        }
        this.printTodos();
    }


    // tennivalók státuszának megváltoztatása

    markDone(input) {

        let list = this.getList();
        let inputNumber = parseInt(input);

        if (isNaN(inputNumber) === true) {
            console.log("\nNem lehetséges a módosítás: nem adott meg indexet!");
        } else if (typeof (inputNumber) !== 'number') {
            console.log("\nNem lehetséges a modosítás: a megadott index nem szám!");
        } else if (inputNumber < 1 || list.length < inputNumber) {
            console.log("\nNem lehetséges a módosítás: túlindexelési probléma adódott!");
        } else {
            for (let i = 0; i < list.length; i++) {
                if (i == inputNumber - 1) {
                    if (list[i].status == false) {
                        list[i].status = true;
                    } else {
                        list[i].status = false;

                    }
                }
                fs.writeFileSync('todos.json', JSON.stringify(list, null, 4));
            }
        }
        this.printTodos();
    }



    printManual() {
        console.log(

            `
          Parancssori Todo applikáció
=================================================
                                    
Parancssori argumentumok:   -l   Kilistázza a feladatokat
                            -a   Új feladatot ad hozzá
                            -r   Eltávolít egy feladatot
                            -c   Teljesít egy feladatot`
        );

    }
}

