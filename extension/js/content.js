console.log('hello linkedIn')

const onActivate = () => mainScriptStart();
const onDeactivate = () => mainScriptEnd();

//wait while page will be builded
setTimeout(() => {
    buttonInit(onActivate, onDeactivate);
}, 500);