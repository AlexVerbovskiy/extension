//the local storage must save information about button state
const getActive = () => JSON.parse(localStorage.getItem('active'))
const setActive = value => localStorage.setItem('active', JSON.stringify(value))

const cacheUser = (user) => sessionStorage.setItem('cachedUser', JSON.stringify(user));
const getCachedUser = () => JSON.parse(sessionStorage.getItem('cachedUser'));
const removeCachedUser = () => sessionStorage.removeItem('cachedUser');

//the session has information about actual user id
const getUserId = () => getCachedUser()?.id;

//the session cached information about user images who installed the extension
const setUsers = users => sessionStorage.setItem('users', JSON.stringify(users));
const getUsers = () => JSON.parse(sessionStorage.getItem('users')) || [];
const removeUsers = () => sessionStorage.removeItem('users');

//info about count users
const getCountUsersSession = () => {
    const images = getUsers();
    if (!images) return 0;
    return images.length;
}