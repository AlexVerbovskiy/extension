const listUsersUpdateTime = 60000; //time uodating users in extension list
const remarkAvatarsTime = 1000; //time checkin if linkedin has new images
const updateCacheTime = 60000; //time updating cached users

const defaultUserImg = "https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q";

const serverURL = "http://127.0.0.1:8000/";
const apiURL = serverURL + "api/";

const iconSrc = chrome.runtime.getURL("heart.svg");