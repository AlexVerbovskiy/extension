const appendIconAfter = (size, elem) => {
    if (elem.parent().find('img.marker').length !== 0) return;

    const src = iconSrc;
    height = width = size;
    elem.after(`<img class='marker' style=" height:${height}px; width:${width}px;" src='${src}' alt='marker'>`);
}

const markBySpan = (elem, searchingElem, size) => {
    elem.addClass("marked");
    if (!searchingElem || searchingElem.next().hasClass("marker")) return;
    appendIconAfter(size, searchingElem);
}

const markAnalyticsSpan = (elem) => {
    markBySpan(
        elem,
        elem.closest(".member-analytics-addon-entity-list__entity-content ").prev().find(".EntityPhoto-circle-3-ghost-person "),
        "20"
    );

    markBySpan(
        elem,
        elem.closest(".member-analytics-addon-entity-list__entity-content ").prev().find("img"),
        "20"
    );
}

const markGroupAddSpan = (elem) => {
    markBySpan(
        elem,
        elem.closest(".flex-1.inline-block.align-self-center.pl2.mr5").prev().find(".EntityPhoto-circle-4-ghost-person"),
        "20"
    );
}

const markFindedSpan = (elem) => {
    markBySpan(
        elem,
        elem.closest(".search-global-typeahead__hit--entity-with-search-icon").find("img, div"),
        "10"
    );
}

const markVisitedSpan = (elem) => {
    markBySpan(
        elem,
        elem.closest(".search-typeahead-v2__hit").find("img, div"),
        "10"
    )
}

const markContactSpan = (elem) => {
    markBySpan(
        elem,
        elem.closest(".abi-saved-contacts-row__details").prev().find("img"),
        "20"
    );
}

const markGroupListSpan = (elem) => {
    markBySpan(
        elem,
        elem.closest("li").find(".EntityPhoto-circle-1-ghost-person"),
        "10"
    );
}


const markCommentsSpan = (elem) => markBySpan(
    elem,
    elem.closest(".comments-post-meta__profile-info-wrapper").siblings("a").find(".EntityPhoto-circle-1-ghost-person "),
    "8"
);

//create images near avatars
const normalMark = (elem, size) => {
    //marking element
    elem.addClass("marked");

    //appending icon after elem
    appendIconAfter(size, elem);
}

const markImage = (elem) => normalMark(elem, elem.width() / 4);
const markDiv = (elem) => normalMark(elem, elem.parent().width() / 4);

//parse data to send to the server
const parseUserInfo = userInfo => {
    const res = {};

    //parse info about user
    res["firstName"] = userInfo["firstName"];
    res["lastName"] = userInfo["lastName"];
    res["id"] = userInfo["publicIdentifier"];
    res["urn"] = userInfo["entityUrn"].split(':')[3];
    //getting user id from image path
    const image = userInfo["picture"];
    if (image) {
        const partUrl = image["artifacts"][0]["fileIdentifyingUrlPathSegment"];
        res["image"] = image["rootUrl"] + partUrl;
        const splittedPart = partUrl.split("?")[0];
        res["image_id"] = splittedPart.split("/")[2];
    } else {
        res["image"] = res["image_id"] = "";
    }

    return {
        ...res
    };
}


const filterUsers = (users, start = 0, text = "") => {
    text = text.toLowerCase();
    const res = [];
    const splittedText = text.split(" ");

    let filter = user => user["first_name"].toLowerCase().includes(text) || user["last_name"].toLowerCase().includes(text);

    if (splittedText.length >= 2) {
        filter = user => ((user["first_name"].toLowerCase().includes(splittedText[0]) && user["last_name"].toLowerCase().includes(splittedText[1])) ||
            (user["first_name"].toLowerCase().includes(splittedText[1]) && user["last_name"].toLowerCase().includes(splittedText[0])))
    }

    users.forEach(user => {
        if (filter(user)) res.push(user);
    });

    return res.slice(start, start + 10);
}

const getTimeActive = (seconds) => {
    if (seconds < 60) return "less than a minute ago";
    if (seconds < 120) return "about a minute ago";

    if (seconds < 3600) return `${Math.floor(seconds/60)} minutes ago`;
    if (seconds < 7200) return `about an hour ago`;

    if (seconds < 86400) return `${Math.floor(seconds/3600)} hours ago`;
    if (seconds < 172800) return `about a day ago`;

    if (seconds < 2592000) return `${Math.floor(seconds/86400)} days ago`;

    return `Wasn't active for a long time`;
}