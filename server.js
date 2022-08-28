const app = require("./app");
const pJSON = require("./package.json");

const port = global.process.env.PORT || 8000;

app.listen(port);

console.log(`${pJSON.name} listening at ${port}`);
