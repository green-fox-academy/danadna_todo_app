import Todos from "./Todos.js";


const args = process.argv.slice(2);
const app = new Todos(args);



app.run();