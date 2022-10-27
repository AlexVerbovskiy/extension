const callbacks = [];

const sendRequest = (data, success) => {
    chrome.runtime.sendMessage(data);
    callbacks[data.name] = success;
}

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

//the count of users who installed the extension and activated it
const getCountUsers = (success) => {
    const userId = getUserId() || "";
    const url = apiURL + "count-users/" + userId;

    sendRequest({
        url,
        type: "get",
        name: "count-users"
    }, success);
}