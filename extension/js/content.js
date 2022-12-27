let interval = null;

const onActivate = () => {
    mainScriptStart();

    //after receiving information about actual user, create a list based on his data
    const user = getCachedUser();
    const url = user["image"] || defaultUserImg;
    const params = {
        firstName: user["firstName"],
        lastName: user["lastName"],
        url
    }
    userListInit(params);

    interval = setInterval(updateOnline, 30000);
}

const onDeactivate = () => {
    clearInterval(interval);
    mainScriptEnd(); //stop main script
    userListDestroy(); //hide list
}

/*waiting for the header to be generated */
const checkLoad = () => {
    if ($('.global-nav__primary-items').length) {
        buttonInit(onActivate, onDeactivate);
    } else {
        setTimeout(checkLoad, 100);
    }
}

//when closing the window, check if user has another linkedin window, if not, save the information about offline
window.onbeforeunload = function (e) {
    setCountPages(count => {
        if (count < 2) setUserOffline();
        return count - 1
    });
};



//on open window save info about count linkedin pages
setCountPages(count => {
    console.log(count);
    if (count) return count + 1;
    return 1;
});

checkLoad();
hidePremium();