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

    let result = bashInterpreter.parse(output);

    console.log(result);

    assert.equal(result.length, 4);

    assert.equal(result[0].COMMAND, "Safari");
    assert.equal(result[1].COMMAND, "Opera");
    assert.equal(result[2].COMMAND, "Firefox");
    assert.equal(result[3].COMMAND, "Google\\x20Chrome");

    assert.equal(result[0].PID, 27000);
    assert.equal(result[1].PID, 27001);
    assert.equal(result[2].PID, 27002);
    assert.equal(result[3].PID, 27003);

    assert.equal(result[0].USER, "darth");
    assert.equal(result[1].USER, "yoda");
    assert.equal(result[2].USER, "skywalker");
    assert.equal(result[3].USER, "kenobi");

    assert.equal(result[0].FD, "txt");
    assert.equal(result[1].FD, "txt");
    assert.equal(result[2].FD, "txt");
    assert.equal(result[3].FD, "txt");

    assert.equal(result[0].TYPE, "REG");
    assert.equal(result[1].TYPE, "REG");
    assert.equal(result[2].TYPE, "REG");
    assert.equal(result[3].TYPE, "REG");

    assert.equal(result[0].DEVICE, "1,1");
    assert.equal(result[1].DEVICE, "1,1");
    assert.equal(result[2].DEVICE, "1,1");
    assert.equal(result[3].DEVICE, "1,1");

    assert.equal(result[0]["SIZE/OFF"], "18672");
    assert.equal(result[1]["SIZE/OFF"], "18672");
    assert.equal(result[2]["SIZE/OFF"], "34032");
    assert.equal(result[3]["SIZE/OFF"], "34032");

    assert.equal(result[0].NODE, "39902902");
    assert.equal(result[1].NODE, "39902902");
    assert.equal(result[2].NODE, "38218085");
    assert.equal(result[3].NODE, "38215804");

    assert.equal(result[0].NAME, "/Applications/Safari.app/Contents/MacOS/Safari");
    assert.equal(result[1].NAME, "/Applications/Opera.app/Contents/MacOS/Opera");
    assert.equal(result[2].NAME, "/Applications/Firefox.app/Contents/MacOS/Firefox");
    assert.equal(result[3].NAME, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");
  });
});
