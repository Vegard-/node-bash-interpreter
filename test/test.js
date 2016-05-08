'use strict';

var bashInterpreter = require('../index');

var assert = require('chai').assert;
describe('Bash Interpreter', function() {
  it('should return the output as an JavaScript array.', function () {
    let output =
`COMMAND            PID   USER   FD     TYPE             DEVICE  SIZE/OFF     NODE NAME
Safari 27000 darth  txt      REG                1,1     18672 39902902 /Applications/Safari.app/Contents/MacOS/Safari
Opera 27001 yoda  txt      REG                1,1     18672 39902902 /Applications/Opera.app/Contents/MacOS/Opera
Firefox 27002 skywalker  txt      REG                1,1     34032 38218085 /Applications/Firefox.app/Contents/MacOS/Firefox
Google\\x20Chrome 27003 kenobi  txt      REG                1,1     34032 38215804 /Applications/Google Chrome.app/Contents/MacOS/Google Chrome`

    let result = bashInterpreter.parse(output, {
      headers: {
        "COMMAND": "command",
        "PID": "pid",
        "USER": "user",
        "FD": "fd",
        "TYPE": "type",
        "DEVICE": "device",
        "SIZE/OFF": "sizeOff",
        "NODE": "node",
        "NAME": "name"
      }
    });

    console.log(result);

    assert.equal(result.length, 4);

    assert.equal(result[0].command, "Safari");
    assert.equal(result[1].command, "Opera");
    assert.equal(result[2].command, "Firefox");
    assert.equal(result[3].command, "Google\\x20Chrome");

    assert.equal(result[0].pid, 27000);
    assert.equal(result[1].pid, 27001);
    assert.equal(result[2].pid, 27002);
    assert.equal(result[3].pid, 27003);

    assert.equal(result[0].user, "darth");
    assert.equal(result[1].user, "yoda");
    assert.equal(result[2].user, "skywalker");
    assert.equal(result[3].user, "kenobi");

    assert.equal(result[0].fd, "txt");
    assert.equal(result[1].fd, "txt");
    assert.equal(result[2].fd, "txt");
    assert.equal(result[3].fd, "txt");

    assert.equal(result[0].type, "REG");
    assert.equal(result[1].type, "REG");
    assert.equal(result[2].type, "REG");
    assert.equal(result[3].type, "REG");

    assert.equal(result[0].device, "1,1");
    assert.equal(result[1].device, "1,1");
    assert.equal(result[2].device, "1,1");
    assert.equal(result[3].device, "1,1");

    assert.equal(result[0]["sizeOff"], "18672");
    assert.equal(result[1]["sizeOff"], "18672");
    assert.equal(result[2]["sizeOff"], "34032");
    assert.equal(result[3]["sizeOff"], "34032");

    assert.equal(result[0].node, "39902902");
    assert.equal(result[1].node, "39902902");
    assert.equal(result[2].node, "38218085");
    assert.equal(result[3].node, "38215804");

    assert.equal(result[0].name, "/Applications/Safari.app/Contents/MacOS/Safari");
    assert.equal(result[1].name, "/Applications/Opera.app/Contents/MacOS/Opera");
    assert.equal(result[2].name, "/Applications/Firefox.app/Contents/MacOS/Firefox");
    assert.equal(result[3].name, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");
  });
});
