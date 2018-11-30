class Command {
    getCommand() {

    }
}

class RunCommand extends Command{

    constructor(command) {
        super();
        if (!(command instanceof Array)) {
            throw new Error("Expected instance of type Array but found : "+(typeof command));
        }

        this.command = command;
    }

    getCommand() {
        return "RUN " + this.command.reduce((previousValue, currentValue) => previousValue + " " + currentValue);
    }
}

class CopyCommand extends Command{
    constructor(src,dest) {
        super();
        if (typeof src !== 'string'){
            throw Error("Expected a string but found "+(typeof src))
        }
        if (typeof dest !== 'string'){
            throw Error("Expected a string but found "+(typeof dest))
        }

        this._src = src;
        this._dest = dest;
    }

    getCommand() {
        return "COPY "+this._src+ " "+this._dest
    }
}

class EntryPointCommand extends Command{

    constructor(command) {
        super();
        if (!(command instanceof Array)) {
            throw new Error("Expected instance of type Array but found : "+(typeof command));
        }

        this._command = command;
    }


    getCommand(){
        return "ENTRYPOINT " + this._command.reduce((previousValue, currentValue) => previousValue + " " + currentValue);
    }
}

export {CopyCommand,RunCommand,EntryPointCommand}