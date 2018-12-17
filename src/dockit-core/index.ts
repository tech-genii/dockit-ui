import * as YAML from 'yaml'
import * as fs from 'fs'

let dockitConf:any = fs.readFileSync(__dirname+'/Dockit.yaml',"utf-8");

console.log(dockitConf);
dockitConf = YAML.parse(dockitConf);
console.log(dockitConf.dockit.devImage);