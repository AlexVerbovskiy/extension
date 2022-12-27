const listUsersUpdateTime = 60000; //time uodating users in extension list
const remarkAvatarsTime = 1000; //time checkin if linkedin has new images
const updateCacheTime = 60000; //time updating cached users

const defaultUserImg = chrome.runtime.getURL("ghost.svg");

//const serverURL = "http://ec2-34-204-76-116.compute-1.amazonaws.com/";
const serverURL = "http://127.0.0.1:8000/";
const apiURL = serverURL + "api/";

const iconSrc = chrome.runtime.getURL("heart.svg");
const logoSrc = chrome.runtime.getURL("logo.svg");
const darkLogoSrc = chrome.runtime.getURL("logo-dark.svg");