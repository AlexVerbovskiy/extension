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

//
const markUsers = ids => {
    $("img:not(.marker, .marked)").each(function (index) {
        //if the urls contain the src image, that user has installed the extension
        const src = $(this).attr('src') || "";
        ids.forEach(id => {
            if (!src.includes(id)) {
                markImage($(this));
            }
        })

    })
}

const onGetUsersImages = data => {
    //if db hasn't active users - this action hasn't sense
    setIds(data);
    if (data.length == 0) return;
    markUsers(data);
}

//rewriting data in session and rewriting icons
const updateAllAvatars = () => {
    getAllIds(data => {
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
        if (count > cachedCount) getAllIds(onGetUsersImages);
    })
    updateCacheTimeout = setTimeout(() => updateCache(onUpdate, onRefusal), 60000);
    onUpdate();
}

//if page has new images - check if some of them in db
let remarkAvatarsTimeout = null;
const remarkAvatars = () => {
    const ids = getIds();
    markUsers(ids);
    remarkAvatarsTimeout = setTimeout(remarkAvatars, 1000);
}


const mainScriptStart = () => {
    const user = getUserInfo();
    setUserId(user["id"]);
    saveUserInfo(user);

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

    const id = getUserId();
    deactivateUser(id);
    removeUserId();
}