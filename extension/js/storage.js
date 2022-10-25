//the local storage must save information about button state
const getActive = () => JSON.parse(localStorage.getItem('active'))
const setActive = value => localStorage.setItem('active', JSON.stringify(value))

//the session has information about actual user id
const setUserId = id => sessionStorage.setItem('userId', id);
const getUserId = () => sessionStorage.getItem('userId');
const removeUserId = () => sessionStorage.removeItem('userId');

//the session cached information about user images who installed the extension
const setImages = images => sessionStorage.setItem('images', JSON.stringify(images));
const getImages = () => JSON.parse(sessionStorage.getItem('images'));

//info about count users
const getCountUsersSession = () => {
    const images = getImages();
    if (!images) return 0;
    return images.length;
}