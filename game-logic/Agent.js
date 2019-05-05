const BoardObject = require('./BoardObject');
const Inventory = require('./Inventory');

class Agent extends BoardObject {
  constructor(id) {
    super({
      name: id,
      id,
      moveable: false,
      possesable: false,
      transferable: false,
      usable: false,
      passable: false,
      inspectable: false,
      destructable: false,
      puzzleType: null,
      objectType: 'Agent',
    });
    this.inventory = new Inventory();
    this.spriteId = null;
  }

  getItem(item) {
    if (!item) return;
    this.inventory.addItem(item);
  }

  giveItem(itemName, recipient) {
    const item = this.removeItem(itemName);
    if (item) recipient.getItem(item);
  }

  // given an item name drops it onto the board
  removeItem(itemName) {
    return this.inventory.removeItem(itemName);
  }

  // returns a list of all the items in this agent's inventory
  getAllItems() {
    return this.inventory.flattenInventory();
  }

  getSpriteName() {
    return this.spriteId;
  }
}

module.exports = Agent;
