import {RunCommand,CopyCommand,EntryPointCommand,EnvCommand} from './DockerfileCommands'

test('Test Commands validation : throw exception',()=>{
    expect(()=>{new RunCommand()}).toThrow();
    expect(()=>{new CopyCommand()}).toThrow();
    expect(()=>{new CopyCommand("")}).toThrow();
    expect(()=>{new EntryPointCommand()}).toThrow();
    expect(()=>{new EnvCommand()}).toThrow();
    expect(new EnvCommand([]).getCommand()).toBe("");
});

test('Test Commands validation : valid arguments',()=>{
    expect(new RunCommand([])).toBeInstanceOf(RunCommand);
    expect(new CopyCommand("","")).toBeInstanceOf(CopyCommand);
    expect(new EntryPointCommand([])).toBeInstanceOf(EntryPointCommand);
    expect(new EnvCommand([])).toBeInstanceOf(EnvCommand);
});