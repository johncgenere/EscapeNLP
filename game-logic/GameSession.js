const Agent = require('./Agent');
const { Grid } = require('./Grid');
const PuzzleManager = require('./PuzzleManager');
const roomLayoutBuild = require('./room-layouts/room-1');
const NLInterpreter = require('../nlp/NLInterpreter');

class GameSession {
  constructor(id, name) {
    this.puzzleManager = null;
    this.grid = null;
    this.agents = [];
    this.id = id;
    this.name = name;
    this.playerIdCounter = 0;
    this.inProgress = false;
    this.isCompleted = false;
    this.interpreter = null;
  }

  getFormattedBoard() {
    return this.grid.getFormattedGrid();
  }

  addPlayerToSession() {
    this.agents.push(new Agent(this.playerIdCounter));
    return this.playerIdCounter++;
  }

  setPlayerName(playerId, playerName) {
    this.agents.forEach((agent) => {
      if ((agent.id === parseInt(playerId, 10))) {
        agent.name = playerName;
      }
    });
  }

  dropPlayerFromSession(playerName) {
    if (this.inProgress) {
      const droppedAgent = this.agents.find(agent => agent.name === playerName);
      this.grid.removeFromBoard(droppedAgent);
    }

    const newAgents = this.agents.filter(agent => agent.name !== playerName);
    this.agents = newAgents;
  }

  getIsGameCompleted() {
    if (this.inProgress) {
      this.isCompleted = this.puzzleManager.checkGameComplete();
    }
    return this.isCompleted;
  }

  getIsGameInProgress() {
    return this.inProgress;
  }

  // formats players array into the object format used on frontend
  // this object format may not be optimal but we'd have to rewrite
  // a good chunk of the frontend to fix it
  getFormattedPlayersList() {
    const formattedObj = {};
    const agentObjs = this.agents.map(agent => ({
      name: agent.name,
      id: agent.id,
      inventory: agent.getFormattedInventory(),
    }));

    this.agents.forEach((agent, index) => {
      formattedObj[agent.name] = agentObjs[index];
    });

    return formattedObj;
  }

  startGame() {
    this.inProgress = true;
    this.generateGame();
  }

  performAction(message) {
    return this.interpreter.executeInput({
      userName: message.commenter,
      data: message.text,
    });
  }

  generateGame() {
    const grid = roomLayoutBuild();
    this.grid = new Grid(grid);
    this.puzzleManager = new PuzzleManager(this.grid);
    this.puzzleManager.addPuzzlesToBoard();
    this.interpreter = new NLInterpreter(this.grid, this.puzzleManager);
    this.addAgentsToMap();
  }

  addAgentsToMap() {
    const spawnPoints = [
      { x: 1, y: 7 },
      { x: 1, y: 9 },
      { x: 4, y: 7 },
      { x: 4, y: 9 },
      { x: 2, y: 8 },
    ];
    this.agents.forEach((agent) => {
      this.grid.add(agent, spawnPoints.pop());
    });
  }

  get playerCount() {
    return this.agents.length;
  }
}

module.exports = GameSession;
