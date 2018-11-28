
let DockerfileBuilder = require('./DockerfileBuilder').DockerfileBuilder();
let RunCommand = require('./RunCommand').runCommand;

let dockerfileBuilder,runCommand;

beforeEach(()=>{
    dockerfileBuilder = new DockerfileBuilder();
    runCommand = new RunCommand([]);
});

afterEach(() => {
    dockerfileBuilder = null;
});

test('Test DockerfileBuilder Init',()=>{
    new DockerfileBuilder();
});

test('Test builder method returns builder instance',()=>{

    expect(dockerfileBuilder.withBaseImage('ubuntu') instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.andRun(runCommand) instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.andCopy() instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.withEntryPointBuilder() instanceof DockerfileBuilder ).toBeTruthy();
    expect(dockerfileBuilder.withEnvs() instanceof DockerfileBuilder ).toBeTruthy();

});

test('Test DockerfileBuilder methods',()=>{
    expect(()=>{dockerfileBuilder.withBaseImage();}).toThrow();
    expect(dockerfileBuilder.withBaseImage('ubuntu')).not.toBeNull();
});