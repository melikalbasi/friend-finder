// Require friends.js
var friends = require("../data/friends");

// Export app function
module.exports = function(app) {
  // Use app.get() method to receive friends arrays as json object
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // Use app.post() method to take in survey submissions
  app.post("/api/friends", function(req, res) {
    console.log(req.body);

    // Declare variables
    var userData = req.body;
    var newFriend = {};
    newFriend.name = "";
    newFriend.photo;
    newFriend.totalDiff = 1000;
    
    // Iterate through friends array
    for (var i = 0; i < friends.length; i++) {
      // set each friend to currentFriend 
      var currentFriend = friends[i];
      var difference = 0;
      // console.log("current friend: " + currentFriend);

      // Iterate through each friends score
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userData.scores[j]
        // console.log("current friend score: " + currentFriendScore)
        // console.log("current user score: " + currentUserScore)

        // track the difference
        difference += Math.abs(currentFriendScore - currentUserScore);
      }
      
      // Compare to find the best match
      if (difference <= newFriend.totalDiff) {
        newFriend.name = currentFriend.name;
        newFriend.photo = currentFriend.photo;
        newFriend.totalDiff = difference;
      }

    }
    // return the new match as a json object
    res.json(newFriend);
    // push the userData to the friends array
    friends.push(userData);
  });


};