const serverURL = "http://127.0.0.1:8000/"; //link to server
const fileUrl = serverURL + "storage/"; //link to server files
const apiURL = serverURL + "api/"; //link to server api

//saving actual information about user
const saveUserInfo = userInfo => {
    console.log(userInfo);
    const url = apiURL + "save";
    const success = (data) => console.log(data);
    const data = JSON.stringify(userInfo);

    $.ajax({
        type: "POST",
        contentType: "json",
        data,
        success,
        url
    });
}

//all user images contained in the database of users who have installed the extension
const getAllUsers = (success) => {
    const userId = getUserId() || "";
    const url = apiURL + "all-users/" + userId;

    $.ajax({
        type: "GET",
        dataType: "json",
        success,
        url
    });
}

//the count of users who installed the extension and activated it
const getCountUsers = (success) => {
    const userId = getUserId() || "";
    const url = apiURL + "count-users/" + userId;

    $.ajax({
        type: "GET",
        success,
        dataType: "json",
        url
    });
}