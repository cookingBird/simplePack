const { getAST, getDependencies, transform } = require('./parser.js');
const path = require('path');
console.log();
const ast = getAST(path.join(__dirname, '../src/index.js'));
const dependencies = getDependencies(ast);
const source = transform(ast);
console.log(source);
