console.log('hello linkedIn')

const onActivate = () => {
    mainScriptStart();
    //userListInit("https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q", "", "");
}
const onDeactivate = () => {
    mainScriptEnd();
    //userListDestroy();
}

//wait while page will be builded
setTimeout(() => {
    buttonInit(onActivate, onDeactivate);
}, 500);