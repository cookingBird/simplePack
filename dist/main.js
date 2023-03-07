
            (function(modules) {
                function require(fileName) {
                    const fn = modules[fileName];
        
                    const module = { exports : {} };
        
                    fn(require, module, module.exports);
        
                    return module.exports;
                }

                require('C:\Users\DT\Desktop\MyProjects\simplePack\src\index.js');
            })({'C:\Users\DT\Desktop\MyProjects\simplePack\src\index.js': function (require, module, exports) { "use strict";

var _hello = require("./hello.js");

(0, _hello.HelloWorld)('Deng Tao'); },'./hello.js': function (require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelloWorld = HelloWorld;
function HelloWorld(name) {
  console.log('hello world' + 'i am' + name + '!!!');
} },})
        