const signup = require("./signup");
const book = require("./book");
const cab = require("./cab");

cab.sync({alter:true});
signup.sync({alter:true});
book.sync({alter:true});