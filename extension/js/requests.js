const callbacks = [];

//create new request and save callback request with it name to callbacks array
const sendRequest = (data, success) => {
    chrome.runtime.sendMessage(data);
    callbacks[data.name] = success;
}

//on creating new request, start listening input calls and if one of them has name which contains in callbacks, call this function
chrome.runtime.onMessage.addListener(({
    name,
    res
}) => {
    if (callbacks[name]) {
        callbacks[name](res);
        delete callbacks[name];
    }
});

//saving actual information about user
const saveUserInfo = userInfo => {
    const url = apiURL + "save";
    const success = (data) => console.log(data);
    const data = JSON.stringify(userInfo);

    sendRequest({
        data,
        url,
        type: "post",
        name: "save"
    }, success);
}

//all user images contained in the database of users who have installed the extension
const getAllUsers = (success) => {
    const userId = getUserId() || "";
    const url = apiURL + "all-users/" + userId;

    sendRequest({
        url,
        type: "get",
        name: "all-users"
    }, success);
}

//this request say server that user is active
const updateOnline = () => {
    const userId = getUserId() || "";
    const url = apiURL + "update-online/" + userId;

    sendRequest({
        url,
        type: "get",
        name: "update-online"
    }, () => {});
}

const saveOtherUserImg = (id, url) => {
    const m_url = apiURL + "update-user-image";
    const data = JSON.stringify({
        id,
        url
    });

    sendRequest({
        url: m_url,
        type: "post",
        name: "update-user-image",
        data
    }, (res) => {
        console.log(res);
    });
}

//the count of users who installed the extension and activated it
const setUserOffline = () => {
    const id = getUserId() || "";
    const url = apiURL + "offline";
    const data = JSON.stringify({
        id
    });

    sendRequest({
        url,
        data,
        type: "post",
        name: "offline"
    }, (data) => console.log(data));
}
