const { error } = require("console");
const fs = require("fs");

fs.writeFileSync("./Demo.txt");

// fs.writeFile("./Demo.txt", "Hellooooo!!!!!", (e) => {
//   if (e) console.log(e);
//   else console.log("successful");
// });

//agertar shathe notun ta add kore instead of overwriting it
fs.appendFile("../Demo.txt", "\n Hellooooo!!!!! \nsleep", (e) => {
  if (error) console.log(error); //should write error instead of e
  else console.log("successful");
});
