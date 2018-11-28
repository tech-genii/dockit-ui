let RunCommand = require('./RunCommand').runCommand;

test('RunCommand Init',()=>{
    new RunCommand(["apt-get","git"]);
});