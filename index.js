class screen {
  constructor() {
  }

  myMethod(json) {
      console.log('This is a method in MyClass ' + json);
  }
}

const readline = require('readline');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let jsonData = '';

rl.on('line', function(line){
  try {
      jsonData += line.trim();

      if (jsonData.lastIndexOf('}') === jsonData.length - 1 && jsonData.split('{').length === jsonData.split('}').length) {
          jsonParsed = JSON.parse(jsonData);
          console.log("jsonParsed :" + jsonParsed);
      }

      console.log('Received JSON data:', jsonData);
  } catch (error) {
      console.error('Error parsing JSON:', error);
  }
});

process.on('SIGINT', function() {
  process.exit(0);
});

process.on('SIGTERM', function() {
  process.exit(0);
});
