//create images near avatars
const markImage = (image) => {
    //marking element
    image.addClass("marked");

    //if the next element has a class marker, that element was marked in the past
    const nextElement = image.next();
    if (nextElement.hasClass("marker")) return;

    //calculate height, width and margins
    const src = fileUrl + 'heart.svg';
    const height = image.width() / 4.5;
    const width = image.width() / 4.5;
    const top = image.height() - height / 2;
    const left = image.width() - width / 2;

    //appending icon after image
    image.after(`<img class='marker' style="left:${left}px; top:${top}px; height:${height}px; width:${width}px;" src='${src}' alt='marker'>`);
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
        res["url"] = image["artifacts"][0]["fileIdentifyingUrlPathSegment"];
    } else {
        res["url"] = "";
    }
    return {
        ...res
    };
}