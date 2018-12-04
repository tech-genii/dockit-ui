#!/usr/bin/env node
const cli = require('commander');
const Table = require('tty-table');
const chalk = require('chalk');
cli
.version('1.0.0')
.description('This is dockit command');

cli
.command('monitor <containerId>')
.alias('m')
.description('This command help you monitor your running containers')
.action((containerId)=>{
    let header = [
        { value: 'name', width: 30, headerAlign: 'left' },
        { value: 'price', width: 30, headerAlign: 'left' }
    ];
    
    const options = {
        align: 'left'
    };
    
    const data = [
        [`apple ${chalk.red("mac")}`,92.50],
        ["ibm",120.15]
    ];
    
    let t3 = Table(header,data, options);

    console.info(t3.render());
})

cli.parse(process.argv);