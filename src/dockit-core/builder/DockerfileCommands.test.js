import {RunCommand,CopyCommand,EntryPointCommand,EnvCommand} from './DockerfileCommands'

test('Test Commands validation : throw exception',()=>{
    expect(()=>{new RunCommand()}).toThrow();
    expect(()=>{new RunCommand([])}).toThrow();
    expect(()=>{new CopyCommand()}).toThrow();
    expect(()=>{new CopyCommand("")}).toThrow();
    expect(()=>{new EntryPointCommand()}).toThrow();
    expect(()=>{new EnvCommand()}).toThrow();
    expect(new EnvCommand([]).getCommand()).toBe("");
});

test('Test Commands validation : valid arguments',()=>{
    expect(new RunCommand(["echo"])).toBeInstanceOf(RunCommand);
    expect(new CopyCommand("","")).toBeInstanceOf(CopyCommand);
    expect(new EntryPointCommand([])).toBeInstanceOf(EntryPointCommand);
    expect(new EnvCommand([])).toBeInstanceOf(EnvCommand);
});

it('Test RunCommand', () => {
    expect(new RunCommand(["/bin/bash","echo","${SAIF}"]).getCommand()).toMatchSnapshot();
});

it('Test CopyCommand', () => {
    expect(new CopyCommand("src","dest").getCommand()).toMatchSnapshot();
});

it('Test EntryPointCommand', () => {
    expect(new EntryPointCommand(["java","-jar","java.jar"]).getCommand()).toMatchSnapshot();
});

it('Test EnvCommand', () => {
    expect(new EnvCommand([["env1","value2"],["env2","value2"]]).getCommand()).toMatchSnapshot();
});