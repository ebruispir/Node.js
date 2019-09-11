'use strict';

const fs = require('fs');
const chalk = require('chalk');

const task_path = './database.json';

function init() {
  if (!fs.existsSync(task_path)) {
    console.log(chalk.blue('Initialising storage.\n Creating `database.json` file'));
    setData([]);
  } else {
    getData();
  }
}

function getData() {
  const contents = fs.readFileSync(task_path);
  const data = JSON.parse(contents);

  return data;
}

function setData(data) {
  const dataString = JSON.stringify(data);

  fs.writeFileSync(task_path, dataString);
}

function help() {
  console.log(chalk.blue('\nlist :list all items from todo list\n'));
  console.log(chalk.blue('add :add item to todo list\n'));
  console.log(chalk.blue('remove :remove item from todo list\n'));
  console.log(chalk.blue('update :update  item\n'));
  console.log(chalk.blue('reset  : delete all todo list items\n'));
}

function add(task) {
  const data = getData();

  data.push({ task: task, completed: false });

  setData(data);

  list();
}

function update(task) {
  const data = getData();

  setData(data);

  list();
}

function del(task) {
  const data = getData();

  data.splice(task, task + 1);

  setData(data);

  list();
}

function list() {
  const data = getData();

  if (data.length > 0) {
    console.log(chalk.yellow('Todos list:'));
    data.forEach(function(task, index) {
      console.log(chalk.yellow(index + 1 + '.', task.task));
    });
  } else {
    console.log(chalk.red('No tasks added!!'));
  }
}

function reset() {
  const data = getData();
  data.splice(0, data.length);
  setData(data);

  list();
}

const command = process.argv[2];
const argument = process.argv[3];

init();

switch (command) {
  case 'add':
    add(argument);
    break;
  case 'update':
    update(argument - 1);
    break;
  case 'delete':
    del(argument - 1);
    break;
  case 'help':
    help();
    break;
  case 'reset':
    reset();
    break;
  case undefined:
    list();
    break;

  default:
    console.log(chalk.red('Command not found!!'));
    help();
    break;
}

