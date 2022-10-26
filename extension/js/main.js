//remove icons near user avatars
const removeMarkers = () => {
    $(".marker").remove();
    $(".marked").removeClass("marked");
}

const getUserInfo = () => {
    const getCountKeys = () => Object.keys(res).length;

    let res = {};
    $("code").each(function () {
        try {
            //if the code does not include a field or the text in the code cannot be parsed - the iteration ends
            //if res isn't empty - end iteration
            const data = JSON.parse($(this).text());

            if (!data["included"] || getCountKeys() > 0) return;

            //read the info about user
            data["included"].forEach(elem => {
                //if object hasn't field name or res isn't empty - the actual element doesn't contain user data
                if (!elem["firstName"] || getCountKeys() > 0) return;
                res = parseUserInfo(elem);
            })
        } catch (e) {
            return;
        }
    })
    return res;
}

const markUsers = users => {
    users.forEach(user => {
        const firstName = user["first_name"];
        const lastName = user["last_name"];
        const mainId = user["image_id"];

        if (mainId) {
            $(`img[src*="${mainId}"]:not(.marked)`).each(function () {
                markImage($(this));
            });
        } else {
            //find imgs with alt which contains user first and last name and user hasn't any dynamic image
            $(`img[alt*="${firstName} ${lastName}"]:not([src*="media-exp"]):not(.marked)`).each(function () {
                markImage($(this));
            });

            //find hidden divs with text which contains user first and last name
            $(`div.visually-hidden:contains("${firstName} ${lastName}"):not(.marked)`).each(function () {
                markImage($(this));
            })

            //find comments which contains hidden divs with text which contains user first name
            $(`.update-components-header__text-wrapper div.visually-hidden:contains("${firstName}"):not(.marked)`).each(function () {
                markImage($(this));
            })
        }
    })
}

const onGetUsersImages = data => {
    //if db hasn't active users - this action hasn't sense
    setUsers(data);
    if (data.length == 0) return;
    markUsers(data);
}

//rewriting data in session and rewriting icons
const updateAllAvatars = () => {
    getAllUsers(data => {
        console.log(data);
        removeMarkers();
        onGetUsersImages(data)
    });
}

//if db has new users - showing them
let updateCacheTimeout = null;
const updateCache = (onUpdate, onRefusal) => {
    getCountUsers(count => {
        const cachedCount = getCountUsersSession();
        if (count === cachedCount) {
            return onRefusal();
        }

        if (count < cachedCount) updateAllAvatars();
        if (count > cachedCount) getAllUsers(onGetUsersImages);
    })
    updateCacheTimeout = setTimeout(() => updateCache(onUpdate, onRefusal), 60000);
    onUpdate();
}

//if page has new images - check if some of them in db
let remarkAvatarsTimeout = null;
const remarkAvatars = () => {
    const users = getUsers();
    markUsers(users);
    remarkAvatarsTimeout = setTimeout(remarkAvatars, 1000);
}

const workWithUser = (active) => {
    const user = getUserInfo();
    user["active"] = active;
    setUserId(user["id"]);
    saveUserInfo(user);
}

const mainScriptStart = () => {
    workWithUser(true);

    //if the data has been updated - the images are marked, if not - mark
    updateCache(
        () => remarkAvatarsTimeout = setTimeout(remarkAvatars, 1000),
        () => remarkAvatars()
    );

}


const mainScriptEnd = () => {
    clearTimeout(updateCacheTimeout);
    clearInterval(remarkAvatarsTimeout);
    removeMarkers();

    workWithUser(false);
    removeUserId();
    removeUsers();
}