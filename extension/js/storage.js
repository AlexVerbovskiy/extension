//the local storage must save information about button state
const getActive = () => JSON.parse(localStorage.getItem('active'))
const setActive = value => localStorage.setItem('active', JSON.stringify(value))

//the session has information about actual user id
const setUserId = id => sessionStorage.setItem('userId', id);
const getUserId = () => sessionStorage.getItem('userId');
const removeUserId = () => sessionStorage.removeItem('userId');

//the session cached information about user images who installed the extension
const setUsers = ids => sessionStorage.setItem('users', JSON.stringify(ids));
const getUsers = () => JSON.parse(sessionStorage.getItem('users')) || [];
const removeUsers = () => sessionStorage.removeItem('users');

//info about count users
const getCountUsersSession = () => {
    const images = getUsers();
    if (!images) return 0;
    return images.length;
}

const getUsersByStart = () => {
    const users = getUsers();
    return (start = 0, text = "") => {
        const res = [];
        const splittedText = text.split(" ");

        let filter = user => user["first_name"].includes(text) || user["last_name"].includes(text);
        if (splittedText.length >= 2) {
            filter = user => user["first_name"].includes(text[0]) && user["last_name"].includes(text[1]) || user["first_name"].includes(text[1]) && user["last_name"].includes(text[0]);
        }

        users.forEach(user => {
            if (filter(user)) res.push(user);
        });

        return res.slice(start, 10);
    }
}