const markBySpan = (elem, searchingElem, size) => {
    elem.addClass("marked");
    if (!searchingElem || searchingElem.next().hasClass("marker")) return;
    const src = fileUrl + 'heart.svg';
    height = width = size;
    searchingElem.after(`<img class='marker' style=" height:${height}px; width:${width}px;" src='${src}' alt='marker'>`);
}

const markAnalyticsSpan = (elem) => markBySpan(
    elem,
    elem.closest(".member-analytics-addon-entity-list__entity-content ").prev().find(".EntityPhoto-circle-3-ghost-person "),
    "20"
);

const markCommentsSpan = (elem) => markBySpan(
    elem,
    elem.closest(".comments-post-meta__profile-info-wrapper").siblings("a").find(".EntityPhoto-circle-1-ghost-person "),
    "8"
);

//create images near avatars
const normalMark = (elem, size) => {
    //marking element
    elem.addClass("marked");

    //if the next element has a class marker, that element was marked in the past
    const nextElement = elem.next();
    if (nextElement.hasClass("marker")) return;

    //appending icon after elem
    const src = fileUrl + 'heart.svg';
    height = width = size;
    elem.after(`<img class='marker' style=" height:${height}px; width:${width}px;" src='${src}' alt='marker'>`);
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
    //getting user id from image path
    const image = userInfo["picture"];
    if (image) {
        const partUrl = image["artifacts"][0]["fileIdentifyingUrlPathSegment"];
        res["url"] = image["rootUrl"] + partUrl;
        const splittedPart = partUrl.split("?")[0];
        res["image_id"] = splittedPart.split("/")[2];
    } else {
        res["url"] = res["image_id"] = "";
    }
    return {
        ...res
    };
}