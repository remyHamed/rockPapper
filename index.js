const CHOICES = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2
};

class GameManager {

  constructor() {
    this.currentPlayer = 1;
    this.grid = [
      [1, 2, 0],
      [3, 3, 3],
      [1, 2, 0,]
    ];
    this.j1 = 0;
    this.j2 = 0;
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

    if (!Array.isArray(json.actions)) {
      this.printError(
        "BAD_FORMAT",
        false,
        "message",
        "actions value is not a list"
      );
      return false;
    }

    if (json.actions.length != 1) {
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

    try{
      this.clickZone(parseInt(action.x), parseInt(action.y));
    } catch (error) {
      this.printError(
        "WRONG_ACTION",
        false,
        "subtype",
        "OUT_OF_ZONE",
        "player",
        this.currentPlayer.toString(),
        "action",
        action.toString(),
        "request_action",
        "{ \"type\" : \"CLICK\",\"player\": " +
        this.currentPlayer +
        ",\"zones\" :" +
        this.getAvailableZones() + "}"
      );
      return false;
    }

  
  }

  getAvailableZones(){
    let obj;
    if(this.currentPlayer === 1){
        obj = [
          {
            "x": 0,// leaf
            "y": 0,
            "width": 100,
            "height": 100
          },
          {
            "x": 0, //scicores
            "y": 100,
            "width": 100,
            "height": 100
          },
          {
            "x": 0, //rock
            "y": 200,
            "width": 100,
            "height": 100
          }
        ];
    }
    if(this.currentPlayer === 2){
      obj = [ {
        "x": 200,// leaf
        "y": 0,
        "width": 100,
        "height": 100
      },
      {
        "x": 200,//scicores
        "y": 100,
        "width": 100,
        "height": 100
      },
      {
        "x": 200,//rock
        "y": 200,
        "width": 100,
        "height": 100
      }];
    }
    return JSON.stringify(obj);
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
        let json = {"type": typeError};
        for (let i = 0; i < args.length; i += 2) {
          const key = args[i];
          const value = args[i + 1];
          json[key] = value;
        }
        console.error(JSON.stringify(json));
        if (fatal) {
          process.exit(1);
        }
    }

    clickZone(x, y) {
      x = Math.floor(x / 100);
      y = Math.floor(y / 100);
      if (x < 0 ) {
        throw new Error("x not in range");   
      }
      if ( y < 0) {
        throw new Error("y not in range");   
      }
      //TODO: check if ther is no middle line coordo
      if(this.currentPlayer === 1){
        this.j1 = this.grid[x][y];
      }
      if(this.currentPlayer === 2){
        this.j2 = this.grid[x][y];
      }
      this.winner = this.runGame(this.j1, this.j2);
      switch (this.winner) {
        case "j1":
          this.score[0] += 1;
          break;
        case "j2":
          this.score[1] += 1;
          break;
        default:
          break
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
let trigger = false;
let gameManager = new GameManager();


rl.on('line', function(line){
  try {
      jsonData += line.trim();
      if(jsonData.length === 0){
        return
      }
      if (jsonData.lastIndexOf('}') === jsonData.length - 1 && jsonData.split('{').length === jsonData.split('}').length) {
          jsonParsed = JSON.parse(jsonData);
          console.log("jsonParsed :" + JSON.stringify(jsonParsed));
          if(trigger === false){
            gameManager.init(jsonParsed);
            trigger = true;
          } else {
            gameManager.runActions(jsonParsed)
          }
          //ToDo: Analyse actions
          //screen.runActions(jsonParsed);

          console.log("-------------------------------TOURNE-------------------------------------");
          jsonData = '';
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
