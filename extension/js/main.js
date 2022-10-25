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
const markUsers = urls => {
    $("img:not(.marker, .marked)").each(function (index) {
        //if the urls contain the src image, that user has installed the extension
        const src = $(this).attr('src');
        if (!urls.includes(src)) {
            markImage($(this));
        }
    })
}

const onGetUsersImages = data => {
    //if db hasn't active users - this action hasn't sense
    setImages(data);
    if (data.length == 0) return;
    markUsers(data);
}

//rewriting data in session and rewriting icons
const updateAllAvatars = () => {
    getAllUrls(data => {
        removeMarkers();
        onGetUsersImages(data)
    });
}

//if db has new users - showing them
let updateCacheTimeout = null;
const updateCache = () => {
    getCountUsers(count => {
        const cachedCount = getCountUsersSession();
        if (count === cachedCount) return false;
        if (count < cachedCount) updateAllAvatars();
        if (count > cachedCount) getAllUrls(onGetUsersImages);
    })
    updateCacheTimeout = setTimeout(updateCache, 60000);
    return true;
}

//if page has new images - check if some of them in db
let remarkAvatarsTimeout = null;
const remarkAvatars = () => {
    const images = getImages();
    markUsers(images);
    remarkAvatarsTimeout = setTimeout(remarkAvatars, 1000);
}


const mainScriptStart = () => {
    const user = getUserInfo();
    setUserId(user["id"]);
    saveUserInfo(user);

    const resUpdatingWithDB = updateAllAvatars();

    //if the data has been updated - the images are marked, if not - mark
    if (resUpdatingWithDB) {
        remarkAvatarsTimeout = setTimeout(remarkAvatars, 1000);
    } else {
        remarkAvatars();
    }
}


const mainScriptEnd = () => {
    clearTimeout(updateCacheTimeout);
    clearInterval(remarkAvatarsTimeout);
    removeMarkers();

    const id = getUserId();
    deactivateUser(id);
    removeUserId();
}