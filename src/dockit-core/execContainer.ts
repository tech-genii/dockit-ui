import * as Docker from "dockerode";
import {Exec} from "dockerode";
import * as Stream from "stream";

const {finished} = require('stream');

const docker = new Docker();

// const containerId = "d16d65ba0d04";
// const container = docker.getContainer(containerId);
//
// container.exec({Cmd: ["ls","/"]}, (error, result: Exec) => {
//     if (error) {
//         console.error(error);
//     } else {
//         result.start({}).then((value:Exec) => {console.log(value.inspect())});
//     }
// });
const buildCommandQueue = ["apt update","apt upgrade -y","/bin/bash"];





export function runExecs(container,commandsQueue,callback) {

    const command = commandsQueue.shift();
    console.log("[Running Command] :: ",command);
    var options = {
        Cmd: ['bash', '-c', command],
        Env: ['VAR=ttslkfjsdalkfj'],
        AttachStdout: true,
        AttachStderr: true
    };


    container.exec(options, function(err, exec) {
        if (err) return;
        exec.start(function(err, stream) {
            if (err) return;

            container.modem.demuxStream(stream, process.stdout, process.stderr);

            finished(stream,(err)=>{
                if (commandsQueue.length) {
                    runExecs(container,commandsQueue,callback);
                }else {
                    callback();
                }
            });
            exec.inspect(function(err, data) {
                if (err) return;
                // console.log(data);
            });
        });
    });
}

export function runExec(container,command,callback) {

    console.log("[Running Command] :: ",command);
    var options = {
        Cmd: ['bash', '-c', command],
        Env: ['VAR=ttslkfjsdalkfj'],
        AttachStdout: true,
        AttachStderr: true,
    };


    container.exec(options, function(err, exec) {
        if (err) return;
        exec.start(function(err, stream) {
            if (err) return;
            container.modem.demuxStream(stream, process.stdout, process.stderr);
            finished(stream,callback);
        });
    });
}



// docker.createContainer({
//     Image: 'ubuntu',
//     Tty: true,
//     Cmd: ['/bin/bash']
// }, function(err, container) {
//     container.start({}, function(err, data) {
//         runExecs(container,buildCommandQueue);
//     });
// });