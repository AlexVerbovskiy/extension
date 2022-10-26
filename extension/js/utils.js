//create images near avatars
const markImage = (elem) => {
    //marking element
    elem.addClass("marked");

    //if the next element has a class marker, that element was marked in the past
    const nextElement = elem.next();
    if (nextElement.hasClass("marker")) return;

    //calculate height, width and margins
    const src = fileUrl + 'heart.svg';
    let height = elem.width() / 4;
    let width = elem.width() / 4;

    const elementType = elem.get(0).tagName;
    if (elementType === 'DIV') {
        height = elem.parent().width() / 4;
        width = elem.parent().width() / 4;
    }

    //appending icon after elem
    elem.after(`<img class='marker' style=" height:${height}px; width:${width}px;" src='${src}' alt='marker'>`);
}

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