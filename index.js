const CHOICES = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2
};

class screen {

  constructor() {
    this.players = [];
    this.actions = [];
    this.score = [];
    this.winner = null;
  }

  init(json) {
    console.log('This is int in MyClass screen ' + json);
    if (!json.hasOwnProperty('init')) {
      return "no init field";
    }
    //TODO: return error if init is not an object
    if (!json.hasOwnProperty('players')) {
      return "no players field";
    }
    //TODO: return error if init don't have players field
    if (Object.keys(json.init).length === 0 || Object.keys(json.init).length > 2) {
      console.log("The JSON object contains the field 'players'.");
    }
    //TODO: return error if init is empty or have too many playerguments
    //TODO: return 
  }

  runActions(json) {
    if (!json.hasOwnProperty('actions')) {
      return "no actions field";
    }
    const actions = json.actions;
    actions.forEach(action => {
      if (!action.hasOwnProperty('type')) {
        return "no type field";
      }
      if (!action.hasOwnProperty('player')) {
        return "no player field";
      }
      if (!action.hasOwnProperty('zone')) {
        return "no zone field";
      }
      if (!action.hasOwnProperty('value')) {
        return "no value field";
      }
      if (Object.keys(action).length === 0 || Object.keys(action).length > 4) {
        console.log("The JSON object contains the field 'actions'.");
      }
    });
  }

  ReadAction(action) {

  }

  runGame(playerChoice, computerChoice) {

        if (playerChoice === computerChoice) {
            return "tie";
        }
        let result = (3 + playerChoice - computerChoice) % 3;
        return result === 1 ? "j1" : "j2";
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
      if(jsonData.length === 0){
        return
      }
      if (jsonData.lastIndexOf('}') === jsonData.length - 1 && jsonData.split('{').length === jsonData.split('}').length) {
          jsonParsed = JSON.parse(jsonData);
          console.log("jsonParsed :" + JSON.stringify(jsonParsed));
          //let screen = new screen();
          //screen.init(jsonParsed);
          //ToDo: Analyse actions
          //screen.runActions(jsonParsed);

          console.log("-------------------------------TOURNE-------------------------------------");
          jsonData = '';
          //draw the svg
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
