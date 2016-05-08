Bash Interpreter
============

NodeJS package for converting standard bash command output to JS objects.

## Getting started

    npm install --save Vegard-/node-bash-interpreter

## Usage

    let bashInterpreter = require('bash-interpreter');
    let objects = bashInterpreter.parse(myBashOutput);
    console.log(objects);
