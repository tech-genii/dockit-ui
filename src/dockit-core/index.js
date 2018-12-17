// import YAML from 'yaml';

const yaml = require('yaml');

const fs = require('fs');

let dockitConf = fs.readFileSync(__dirname+'/Dockit.yaml',"utf-8");
console.log(dockitConf);
dockitConf = yaml.parse(dockitConf);
console.log(dockitConf.dockit.devImage);