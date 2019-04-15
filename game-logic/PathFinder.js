const Point = require('./Point');
const BoardObject = require('./BoardObject');
/*
 * PathFinder:
    1) given a direction finds a suitable path to move along said direction
    2) given a destination finds a suitable path to reach said destination

    Note that this class doesn't do any translation of coordinates from
    player perspective to matrix indices.
 */

const stringifyCoordinates = (x, y) => `${x},${y}`;

class PathFinder {
  constructor(matrix) {
    this.matrix = matrix; // PathFinder needs a reference to matrix object to see obstacles
  }

  /*
    Returns an array of contiguous points illustrating a path
    Direction is a point object that details the vector direction something can go in
  */
  getPathByDirection(start, direction) {
    const pathList = [];
    const queue = [start];
    let p;
    while (queue.length > 0) {
      p = queue.shift();
      if (!this.isPassablePoint(p)) {
        continue;
      }
      
    }
    return path;
  }


  // Returns an array of contiguous Points illustrating a path to reach the destination
  // from the starting coordinate. Returns an empty array if no path exists.
  getPathByDestination(start, destination) {
    const queue = [start];
    const visited = new Set([]);
    const pathList = [];
    let pathExists = false;
    let p;

    while (queue.length > 0) {
      p = queue.shift();
      if (p.x === destination.x && p.y === destination.y) {
        pathExists = true;
        break;
      }

      visited.add(stringifyCoordinates(p.x, p.y));
      const neighbors = this.getNeighbors(p, visited);
      queue.push(...neighbors);
    }

    if (pathExists) {
      while (p !== start) {
        pathList.push(new Point(p.x, p.y));
        p = p.pathHistory;
      }
      pathList.reverse();
    }
    return pathList;
  }

  getNeighbors(p, visited) {
    const neighbors = [
      { x: p.x - 1, y: p.y },
      { x: p.x + 1, y: p.y },
      { x: p.x, y: p.y - 1 },
      { x: p.x, y: p.y + 1 },
    ];
    const validNeighbors = [];

    neighbors.forEach((pt) => {
      if (!visited.has(stringifyCoordinates(pt.x, pt.y)) && this.isPassablePoint(pt)) {
        validNeighbors.push({ x: pt.x, y: pt.y, pathHistory: p });
      }
    });
    return validNeighbors;
  }

  /* Gets neighbors filtered by a direction vector */
  getNeighborsByDirection(p, direction) {
    const neighbors = [];
    const magnitude = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2));
    if (magnitude === 0) {
      return neighbors;
    }
    
    if (magnitude === 1) { // movement along only 1 axis
      let d = new Point(p.x, p.y);
      d.x = d.x + direction.x;
      d.y = d.y + direction.y;
      neighbors.push(d);
    } else { // movement along 2 axis
      let d = new Point(p.x, p.y);
      d.x 
    } return neighbors;
  }

  isPassablePoint({ x, y }) {
    if (x < 0 || y < 0 || x >= this.matrix.length || y >= this.matrix[0].length) {
      return false;
    }
    if (this.matrix[x][y] === 1) {
      return false;
    }
    if (this.matrix[x][y] === null || !(this.matrix[x][y] instanceof BoardObject)
      || this.matrix[x][y].isPassable()) {
      return true;
    }
    return false;
  }
}

module.exports = PathFinder;
