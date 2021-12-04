import pkg from 'shelljs';
const { exec } = pkg;
console.log('[Executor de Código Node]');
//gnome-terminal & novo terminal
// const response = 'Resultado:' + eval(request);

const result = exec(`kill $(lsof -t -i:3001) && npm start || npm start`, { silent: true }).stdout;
console.log("foi");
console.log(result);