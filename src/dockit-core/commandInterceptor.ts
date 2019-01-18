let commandInterceptor = (inputStream) => {

};


interface DockitCommand {}

let dockitCommandInterceptor = (command:DockitCommand) => {

};


let buildEnvCommandsStore = {};

const KEYS = {
    ENTER: 13,
    CTRL:17,
    ALT:18,
    SHIFT:16,
    TAB:9,
    LEFT_PRESS:37,
    UP_PRESS:38,
    RIGHT_PRESS:39,
    DOWN_PRESS:40,
    ESC:27,
};



export {
    commandInterceptor
}