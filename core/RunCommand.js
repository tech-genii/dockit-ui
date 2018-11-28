function RunCommand(command) {
    if (!(command instanceof Array)) {
        throw new Error("Expected instance of type Array but found : "+(typeof command));
    }
}


exports.runCommand = RunCommand;