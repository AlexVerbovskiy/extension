//remove icons near user avatars
let removerInterval = null;

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
        const partId = user["linkedin_id"].split("-")[2];
        const urn = user["urn"];
        const fullName = user["first_name"] + " " + user["last_name"];

        $(`.search-global-typeahead__hit--all-suggestions-ui .search-global-typeahead__hit-text:contains("${fullName.toLowerCase()}"):not(.marked)`).each(function () {
            markFindedSpan($(this));
        });

        $(`.search-typeahead-v2__hit span:contains("${fullName.toLowerCase()}"):not(.marked)`).each(function () {
            markVisitedSpan($(this));
        });

        $(`.contact-summary__name:contains("${fullName}"):not(.marked)`).each(function () {
            markContactSpan($(this));
        })

        if (mainId) {
            $(`img[src*="${mainId}"]:not(.marked)`).each(function () {
                markImage($(this));
            });
            $(`.search-global-typeahead__entity-history-item[aria-label*="${fullName}"]  .ivm-view-attr__img--centered:not(.marked)`).each(function () {
                markImage($(this));
            })
            return;
        }

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
            a[href*=${partId}] .EntityPhoto-circle-6-ghost-person .visually-hidden:not(.marked),
            a[href*=${urn}] .EntityPhoto-circle-3-ghost-person .visually-hidden:not(.marked),
            a[href*=${urn}] .EntityPhoto-circle-0-ghost-person .visually-hidden:not(.marked),
            .search-global-typeahead__entity-history-item[aria-label*="${fullName}"] .EntityPhoto-circle-2-ghost-person:not(.marked)
        `).each(function () {
            markDiv($(this));
        });

        $(`.member-analytics-addon-entity-list__entity-content span[aria-hidden="true"]:contains("${fullName}"):not(.marked)`).each(function () {
            markAnalyticsSpan($(this));
        });

        $(`.scaffold-finite-scroll__content .flex-1.inline-block.align-self-center.pl2.mr5>.t-16.t-black.t-bold:contains("${fullName}"):not(.marked)`).each(function () {
            markGroupAddSpan($(this));
        });

        $(`.invitee-picker-selected-members-pane__list .t-14.t-bold.flex-1.ml2.truncate:contains("${fullName}"):not(.marked)`).each(function () {
            markGroupListSpan($(this));
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

let isActive = true;

//if page has new images - check if some of them in db
let remarkAvatarsTimeout = null;
const remarkAvatars = () => {
    clearTimeout(remarkAvatarsTimeout);

    if (!isActive) return;

    const users = getUsers();
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