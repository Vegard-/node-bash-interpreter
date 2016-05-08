Bash Interpreter
============

NodeJS package for converting standard bash command output to JS objects.

## Getting started

    npm install --save Vegard-/node-bash-interpreter

## Usage

    let bashInterpreter = require('bash-interpreter');
    let objects = bashInterpreter.parse(myBashOutput);
    console.log(objects);

## Mapping bash headers with custom names

The following would convert all headers "MY_BASH_HEADER_NAME" to "myObjectKeyName".

    let bashInterpreter = require('bash-interpreter');
    let objects = bashInterpreter.parse(myBashOutput, {
        "MY_BASH_HEADER_NAME": "myObjectKeyName"
    });
    console.log(objects);
