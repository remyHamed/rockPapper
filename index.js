const CHOICES = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2
};

class screen {

  constructor() {
    this.currentPlayer = 1;
    this.actions = [];
    this.score = [];
    this.winner = null;
  }

  init(json) {
    console.log('This is int in MyClass screen ' + json);
    if (!json.hasOwnProperty('init')) {
      this.printError(
        "BAD_FORMAT",
        true,
        "message",
        "init key is missing"
      );
    }
    //TODO: return error if init is not an object
    if (!json.init.hasOwnProperty('players')) {
      this.printError(
        "MISSING_ARGUMENT",
        true,
        "name",
        "players",
        "type",
        "int",
        "min",
        2,
        "max",
        2,
        "description",
         "number of players"
      );
    }
    //TODO: return error if init don't have players field
    if (Object.keys(json.init).length > 1) {
      for(const key in json.init) {
        if (key !== 'players') {
          this.printError(
            "UNEXPECTED_ARGUMENT",
            true,
            "argname",
            key.toString(),
            "value",
            json.init[key].toString()
          );
        }
      }
    }
    //TODO: return error if init is empty or have too many playerguments
    //TODO: return 
  }

  runActions(json) {
    if (!json.hasOwnProperty('actions')) {
      this.printError(
        "BAD_FORMAT",
        true,
        "message",
        "actions key is missing"
      );
    }

    if (!Array.isArray(actions)) {
      this.printError(
        "BAD_FORMAT",
        false,
        "message",
        "actions value is not a list"
      );
      return false;
    }

    if (actions.length != 1) {
      this.printError(
        "BAD_FORMAT",
        false,
        "message",
        "exactly one action is expected"
      );
      return false;
    }
    const action = json.actions[0];
    if (typeof action !== 'object') {
      this.printError(
        "BAD_FORMAT",
        false,
        "message",
        "action is not an object"
      );
      return false;
    }
    if (!action.hasOwnProperty('player')) {
      this.printError(
        "BAD_FORMAT",
        false,
        "message",
        "action is not containing player"
      );
      return false;
    }
    if (!action.hasOwnProperty('x')) {
      this.printError(
        "BAD_FORMAT",
        false,
        "message",
        "action is not containing x"
      );
      return false;
    }
    if (!action.hasOwnProperty('y')) {
      this.printError(
        "BAD_FORMAT",
        false,
        "message",
        "action is not containing y"
      );
      return false;
    }

    if( parseInt(action.player) !== this.currentPlayer) {
      this.printError(
        "MISSING_ACTION",
        false,
        "player",
        this.currentPlayer,
        "requested_action",
        "{ \"type\" : \"CLICK\",\"player\": " +
        this.currentPlayer +
        ",\"zones\" :" +
        this.getAvailableZones() + "}"
      );
      return false;
    }
  
  }

  getAvailableZones(){

  }

  runGame(playerChoice, computerChoice) {

        if (playerChoice === computerChoice) {
            return "tie";
        }
        let result = (3 + playerChoice - computerChoice) % 3;
        return result === 1 ? "j1" : "j2";
    }

    printError(typeError, fatal=false,...args) {
        console.error(typeError, ...args);
        json = {"type": typeError};
        for (let i = 0; i < args.length; i += 2) {
          const key = args[i];
          const value = args[i + 1];
          json[key] = value;
        }
        if (fatal) {
          process.exit(1);
        }
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
