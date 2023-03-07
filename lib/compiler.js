const path = require('path');
const fs = require('fs');
const { getAST, getDependencies, transform } = require('./parser.js');
module.exports = function Compiler(options) {
  this.entry = options.entry;
  this.output = options.output;
  this.modules = [];
  this.run = () => {
    /**
     * todo 从入口文件开始分析依赖
     */
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);
    /**
     * todo 递归分析依赖
     */
    this.modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(this.buildModule(dependency));
      });
    });
    console.log(this.modules);
    /**
     * todo 生成文件
     */
    this.emitFiles();
  };

  this.buildModule = (filename, isEntry) => {
    let ast;
    if (isEntry) {
      ast = getAST(filename);
    } else {
      const absolutePath = path.join(process.cwd(), './src', filename);
      ast = getAST(absolutePath);
    }
    return {
      filename,
      dependencies: getDependencies(ast),
      transformCode: transform(ast),
    };
  };
  this.emitFiles = () => {
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = '';
    /**
     * todo 将this.modules中的modules全部映射成函数
     */
    this.modules.map((_module) => {
      modules += `'${_module.filename}': function (require, module, exports) { ${_module.transformCode} },`;
    });
    let bundle = `
            (function(modules) {
                function require(fileName) {
                    const fn = modules[fileName];
        
                    const module = { exports : {} };
        
                    fn(require, module, module.exports);
        
                    return module.exports;
                }

                require('${this.entry}');
            })({${modules}})
        `;

    fs.writeFileSync(outputPath, bundle, 'utf-8');
  };
};
