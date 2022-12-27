//remove icons near user avatars
let removerInterval = null;

const removeMarkers = () => {
    $(".marker").remove();
    $(".marked").removeClass("marked");
}

//parsing info about actual user
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

//mark all photos of a user using the extension
const markActualUser = () => {
    //take saved info about user
    const user = getCachedUser();
    const partId = user["id"].split("-")[2];

    const filteredUser = {
        firstName: user["firstName"],
        lastName: user["lastName"],
        mainId: user["image_id"],
        urn: user["urn"],
        partId
    };
    findMarkActualUserPhotos(filteredUser);

}

const markUsers = users => {
    users.forEach(user => {

        const partId = user["linkedin_id"].split("-")[2];

        const filteredUser = {
            firstName: user["first_name"],
            lastName: user["last_name"],
            mainId: user["image_id"],
            urn: user["urn"],
            partId
        };

        findMarkUserPhotos(filteredUser);
    })
}

const onGetUsersImages = data => {
    //if db hasn't active users - this action hasn't sense
    removeMarkers();
    setUsers(data);
    if (data.length == 0) return;
    markUsers(data);
}

let isActive = true;

//if page has new images - check if some of them in db
let remarkAvatarsTimeout = null;
const remarkAvatars = () => {
    clearTimeout(remarkAvatarsTimeout);

    if (!isActive) return;

    const users = getUsers();
    markActualUser();
    markUsers(users);
    remarkAvatarsTimeout = setTimeout(remarkAvatars, remarkAvatarsTime);
}

//update info about users in db
let updateCacheTimeout = null;
const updateCache = (onUpdate) => {
    clearTimeout(updateCacheTimeout);
    getAllUsers(onGetUsersImages);
    updateCacheTimeout = setTimeout(() => updateCache(onUpdate), updateCacheTime);
    onUpdate();
}

const workWithUser = (active) => {
    const user = getUserInfo();
    user["active"] = active;
    cacheUser(user);
    saveUserInfo(user);
}

const hidePremium = () => {
    setTimeout(() => {
        if ($(".global-nav__primary-item:has(.premium-upsell-link)").length > 0) {
            $(".global-nav__primary-item:has(.premium-upsell-link)").css('display', 'none');
        } else {
            hidePremium();
        }
    }, 10)
}

//const showPremium = () => $(".global-nav__primary-item:has(.premium-upsell-link)").css('display', 'block');

//if user in session we must save info about him after showing icons
//if user isn't in session we must parse info and show icons after it
const mainScriptStart = () => {
    isActive = true;
    workWithUser(true);
    clearInterval(removerInterval);
    updateCache(
        () => setTimeout(remarkAvatars, remarkAvatarsTime)
    );
}


const mainScriptEnd = () => {
    isActive = false;
    clearTimeout(updateCacheTimeout);
    clearTimeout(remarkAvatarsTimeout);
    removeMarkers();
    removerInterval = setInterval(removeMarkers, 500);
    workWithUser(false);
}