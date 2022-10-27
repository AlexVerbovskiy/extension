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

        const mainId = user["image_id"];
        if (mainId) {
            $(`img[src*="${mainId}"]:not(.marked)`).each(function () {
                markImage($(this));
            });
            return;
        }

        const partId = user["linkedin_id"].split("-")[2];
        const urn = user["urn"];
        const fullName = user["first_name"] + " " + user["last_name"];

        $(`.pv-top-card-profile-picture img[alt*="${fullName}"]:not(.marked),
            a[href*="${partId}"] img[alt*="${fullName}"]:not(.marked),
            a[href*="${urn}"] img[alt*="${fullName}"]:not(.marked),
            .msg-overlay-conversation-bubble img[alt*="${fullName}"]:not(.marked),
            .msg-overlay-container img[alt*="${fullName}"]:not(.marked),
            .msg-s-event-listitem__seen-receipts img[alt*="${fullName}"]:not(.marked)
        `).each(function () {
            markImage($(this));
        });

        $(`a[href*=${urn}] EntityPhoto-circle-2-ghost-person:not(.marked),
            a[href*=${urn}] .EntityPhoto-circle-1-ghost-person:not(.marked),
            a[href*=${urn}] .EntityPhoto-circle-5-ghost-person .visually-hidden:not(.marked),
            a[href*=${partId}] .EntityPhoto-circle-4-ghost-person .visually-hidden:not(.marked),
            a[href*=${urn}] .EntityPhoto-circle-3-ghost-person .visually-hidden:not(.marked),
            a[href*=${urn}] .EntityPhoto-circle-0-ghost-person .visually-hidden:not(.marked)
        `).each(function () {
            markDiv($(this));
        });

        $(`.member-analytics-addon-entity-list__entity-content span[aria-hidden="true"]:contains("${fullName}"):not(.marked)`).each(function () {
            markAnalyticsSpan($(this));
        });
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
        removeMarkers();
        onGetUsersImages(data)
    });
}

//if page has new images - check if some of them in db
let remarkAvatarsTimeout = null;
const remarkAvatars = () => {
    clearTimeout(remarkAvatarsTimeout);
    const users = getUsers();
    markUsers(users);
    remarkAvatarsTimeout = setTimeout(remarkAvatars, remarkAvatarsTime);
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
    updateCacheTimeout = setTimeout(() => updateCache(onUpdate, onRefusal), updateCacheTime);
    onUpdate();
}

const workWithUser = (active) => {
    const user = getUserInfo();
    user["active"] = active;
    cacheUser(user);
    saveUserInfo(user);
}

//if user in session we must save info about him after showing icons
//if user isn't in session we must parse info and show icons after it
const mainScriptStart = () => {
    workWithUser(true);
    updateCache(
        () => setTimeout(remarkAvatars, remarkAvatarsTime),
        () => remarkAvatars()
    );
}


const mainScriptEnd = () => {
    clearTimeout(updateCacheTimeout);
    clearInterval(remarkAvatarsTimeout);
    removeMarkers();
    workWithUser(false);
}