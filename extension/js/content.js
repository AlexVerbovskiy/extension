const onActivate = () => {
    mainScriptStart();
    const user = getCachedUser();
    const url = user["image"] || defaultUserImg;
    const params = {
        firstName: user["firstName"],
        lastName: user["lastName"],
        url
    }
    userListInit(params);
    setCountPages(count => {
        if (count) return count + 1;
        return 1;
    });
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

window.onbeforeunload = function (e) {
    setCountPages(count => {
        if (count == 1) setUserOffline();
        return count - 1
    });
};

checkLoad();