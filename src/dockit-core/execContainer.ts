const {finished} = require('stream');
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