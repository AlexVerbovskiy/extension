//the local storage must save information about button state
const getActive = () => JSON.parse(localStorage.getItem('active'))
const setActive = value => localStorage.setItem('active', JSON.stringify(value))

//the session has information about actual user id
const setUserId = id => sessionStorage.setItem('userId', id);
const getUserId = () => sessionStorage.getItem('userId');
const removeUserId = () => sessionStorage.removeItem('userId');

//the session cached information about user images who installed the extension
const setIds = ids => sessionStorage.setItem('ids', JSON.stringify(ids));
const getIds = () => JSON.parse(sessionStorage.getItem('ids')) || [];

//info about count users
const getCountUsersSession = () => {
    const images = getIds();
    if (!images) return 0;
    return images.length;
}