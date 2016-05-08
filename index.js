"use strict";

module.exports = (()=>{
  var svc = {};
  svc.parse = parse;
  return svc;

  function parse(bashOutput, parameters){
    var lines = bashOutput.split(/[\n\r]+/);
    let headers = lines[0].split(/\s+/);
    lines = lines.slice(1);

    return lines.map((line)=>{
      let pieces = line.split(/\s+/);
      var obj = {};
      for (var i = 0; i < headers.length && i < pieces.length; i++){
        var value;
        if (i == headers.length - 1){
          value = pieces.slice(i).join(' ');
        } else {
          value = pieces[i];
        }
        obj[headers[i]] = value;
      }
      return obj;
    });
  }
})();
