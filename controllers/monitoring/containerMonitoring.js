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
        { value: 'CID', width: 30, headerAlign: 'left' },
        { value: 'IMAGE', width: 30, headerAlign: 'left' },
        {value:'STATUS',width:30,headerAlign:'left'},
        {value:'HEALTH',width:30,headerAlign:'left'},
        {value:'START-TIME',width:60,headerAlign:'left'},
        {value:'END-TIME',width:60,headerAlign:'left'},
        {value:'STATE',width:30,headerAlign:'left'},
    ];
    
    const options = {
        align: 'left'
    };
    
    const data = [
        ['12843-Alok','image-641','RUNNING','GREEN','2018-12-04 11:04:32','NULL','READY'],
        ['09322-Saif','image-097','RUNNING',`${chalk.red('RED')}`,'2018-12-03 11:04:32','2018-12-03 22:00:04','READY'],
        ['93722-Spring','image-843','HALT',`${chalk.green('GREEN')}`,'2018-12-02 11:04:32','NULL','READY']
    ];
    
    let t3 = Table(header,data, options);

    console.info(t3.render());
})

cli.parse(process.argv);