const bcrypt = require("bcryptjs");

let josh = "Josh";
let ian = "Ian";
let shoel = "Shoel";
let kevin = "Kevin";

console.log(bcrypt.hashSync(josh, 10));
console.log("=============================");
console.log(bcrypt.hashSync(ian, 10));
console.log("=============================");
console.log(bcrypt.hashSync(shoel, 10));
console.log("=============================");
console.log(bcrypt.hashSync(kevin, 10));
console.log("=============================");
