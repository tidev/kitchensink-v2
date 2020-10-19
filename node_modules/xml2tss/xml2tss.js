var fs = require('fs'),
    path = require('path'),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser();

// older nodes
function parseXML(o) {
  var buffer = [];
  function process(internal_object) {
    if(typeof internal_object !== 'string' && !(internal_object instanceof String)){
      for(key in internal_object) {
        value = internal_object[key];
        if (key ==="$") {
          if (value.id) {
            buffer.push("#" + value.id);
          }
          if (value.class) {
            buffer = buffer.concat(value.class.split(" ").map(function(o) { return "." + o;}));
          }
        } else if (key !== "_") {
          buffer = buffer.concat(parseXML(value));
        }
      }
    }
  }
  if (o instanceof Array) {
    o.forEach(function(i) {
      process(i);
    });
  } else {
    process(o);
  }
  return buffer;
}

function parseXMLAndFormat(data, custom_filter) {
  var raw = parseXML(data);
  return raw
       .filter(function(elem, pos) {
          return raw.indexOf(elem) === pos && (custom_filter ? custom_filter(elem) : true);
       })
       .sort()
       .map(function(e) {
         return '"'+e+'" : {\n  \n}';
       }).join('\n');
}

function parseTSS(data) {
  var buffer = [];
  // collect existing classses and ids
  var match, regex = /^["']([\.#].+?)['"'][.\n]*?/gm;
  while (match = regex.exec(data)) {
    buffer.push(match[1]);
  }
  return buffer;
}

exports.convertString=function(string, callback) {
  parser.parseString(string, function(err,data) {
    callback(err, parseXMLAndFormat(data));
  });
};

exports.convertFile=function(file,callback) {
  fs.readFile(file, function(err, data) {
    exports.convertString(data,callback);
  });
};

exports.updateFile=function(source, target, callback) {
  var existing =[], content = "";
  if (fs.existsSync(target)) {
    content = fs.readFileSync(target);
    existing = parseTSS(content);
  }
  parser.parseString(fs.readFileSync(source), function(err, data) {
    var additional_content = parseXMLAndFormat(data, function(elem) {
      return existing.indexOf(elem) == -1;
    });
    if (additional_content.length > 0 ) {
      fs.writeFileSync(target, content + "\n" + additional_content);
      callback(null, target + " updated");
    } else {
      callback(target + " already upto date", null);
    }
  });
};
