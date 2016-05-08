"use strict";

module.exports = (()=>{
  var svc = {};
  svc.parse = parse;
  return svc;

  function parse(bashOutput, parameters){
    parameters = parameters || {};
    parameters.headers = parameters.headers || {};

    var lines = bashOutput.split(/[\n\r]+/);
    let headers = lines[0].split(/\s+/);
    lines = lines.slice(1);

    return lines.map((line)=>{
      let obj = {};
      if (!line){
        return null;
      }
      let pieces = line.split(/\s+/);
      for (var i = 0; i < headers.length && i < pieces.length; i++){
        var value;
        if (i == headers.length - 1){
          value = pieces.slice(i).join(' ');
        } else {
          value = pieces[i];
        }
        obj[getHeaderName(parameters.headers, headers[i])] = value;
      }
      return obj;
    })
    .filter((obj)=>{ return !!obj; });
  }

  function getHeaderName(headerMap, headerName){
    return headerMap[headerName] || headerName;
  }
})();
