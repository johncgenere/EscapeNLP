const compromise = require('compromise');

class Regex {
  constructor() {}
}

class VerbRegex extends Regex {
  constructor({ word, synonyms, regExps }) {
    super();
    this.word = word;
    this.synonyms = synonyms;
    this.regExps = regExps;
  }

  match(line) {
    const valid = new Set();
    for (const regex of this.regExps) {
      const matches = compromise(line).match(regex).out('array');
      if (!matches.length) continue;
      for (const match of matches) {
        const verbs = new Set(compromise(match).verbs().out('array'));
        for (const verb of verbs) if (this.synonyms.has(verb)) valid.add(match);
      }
    } return valid;
  }
}

module.exports = VerbRegex;
