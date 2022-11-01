//append icon after element
const appendIconAfter = (size, elem) => {
    if (elem.parent().find('img.marker').length !== 0) return;

    const src = iconSrc;
    height = width = size;
    elem.after(`<img class='marker' style=" height:${height}px; width:${width}px;" src='${src}' alt='marker'>`);
}

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

//find users by first or last name, as in the search text, and from the starting position from the beginning
const filterUsers = (users, start = 0, text = "") => {
    //text and user names must be in one register
    text = text.toLowerCase();
    const res = [];

    //if user search another user by first and second name, extension must understand it
    const splittedText = text.split(" ");

    //function to search user if first or last name include text
    let filter = user => user["first_name"].toLowerCase().includes(text) || user["last_name"].toLowerCase().includes(text);

    //if user search another user by first and second name, get first and second part from searching string 
    //and check if first name include one of parts and last name includes another part
    if (splittedText.length >= 2) {
        filter = user => ((user["first_name"].toLowerCase().includes(splittedText[0]) && user["last_name"].toLowerCase().includes(splittedText[1])) ||
            (user["first_name"].toLowerCase().includes(splittedText[1]) && user["last_name"].toLowerCase().includes(splittedText[0])))
    }

    //validating users
    users.forEach(user => {
        if (filter(user)) res.push(user);
    });

    //return only ten users
    return res.slice(start, start + 10);
}

//function return message for user about offline time another user
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