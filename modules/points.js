var bot;
module.exports.init = function(b) {
  bot = b;
};

module.exports.scoreboard = {};

var xplusplus = /(\w+)\+\+/;
var xplusplusfory = /(\w+)\+\+ (for)? (.*)/;

// Watch for messages of the following forms
// dru++
// dru++ for some reason
module.exports.msg = function(text, from, reply, raw) {
  var re;
  
  if (xplusplusfory.exec(text)) {
    var user = re[0],
      reason = re[2];

    this.scoreboard[user] = this.scoreboard[user] || { points: 0, reasons: [] };
    this.scoreboard[user]['points']++;
    this.scoreboard[user]['reasons'].push(reason);

  } elsif (xplusplus.exec(text)) {
    var user = re[0];

    this.scoreboard[user] = this.scoreboard[user] || { points: 0, reasons: [] };
    this.scoreboard[user]['points']++;
  }
};

module.exports.commands = {

  top10: function(r, parts, reply) {
    var users_and_scores = [],
      rank = 10;

    // yolo js
    for (var user in this.scoreboard) {
      users_and_scores.append([user, scoreboard[user]['points']]);
    }

    // Sort pairs by score: [["dru", 4], ["suroi", 53]]
    users_and_scores = users_and_scores.sort(function (a, b) {
    	return a[1] <= b[1];
    });

    for (var line_data in users_and_scores) {
    	reply("" + (11 - rank--) + ". " + line_data[0] + ": " + line_data[1] + " points!");
    	if (rank == 0) { break; }
    }
  },

  score: function(r, parts, reply) {
    var user = parts[0],
      points = 0;
    
    if (this.scoreboard[user]) {
    	points = this.scoreboard[user]['points'];
    }

    reply(user + " has "  + points + " points!");
    // #todo point reasons
  }
 
};
