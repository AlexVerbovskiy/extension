const onActivate = () => {
    mainScriptStart();
    const user = getCachedUser();
    const url = user["image"] || "https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q";
    const params = {
        firstName: user["firstName"],
        lastName: user["lastName"],
        url
    }
    userListInit(params);
}
const onDeactivate = () => {
    mainScriptEnd();
    userListDestroy();
}

/*waiting for the header to be generated */
const checkLoad = () => {
    if ($('.global-nav__primary-items').length) {
        buttonInit(onActivate, onDeactivate);
    } else {
        setTimeout(checkLoad, 100);
    }
}

checkLoad();