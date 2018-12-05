class Command {
    getCommand() {}
}

class RunCommand extends Command{

    constructor(command) {
        super();
        if (!(command instanceof Array)) {
            throw new Error("Expected instance of type Array but found : "+(typeof command));
        }
        if (!command.length) {
            throw new Error("Empty array")
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

class EnvCommand extends Command{
    constructor(command) {
        super();
        this.NAME = 0;
        this.VALUE = 1;
        if (!(command instanceof Array)) {
            throw new Error("Expected instance of type Array but found : "+(typeof command));
        }

        this.command = command;
    }

    getCommand() {
        if (this.command.length < 1) {
            return "";
        }
        return "ENV " + this.command.map((envs) => {
                return envs[this.NAME] + "="+ envs[this.VALUE]
            }).reduce((previousValue, currentValue) => previousValue + " " + currentValue);
    }
}

class CMDCommand extends Command{

}

export {CopyCommand,RunCommand,EntryPointCommand,EnvCommand}