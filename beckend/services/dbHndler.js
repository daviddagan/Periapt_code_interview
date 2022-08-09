const usersByToken = {};

const rand = function () {
    return Math.random().toString(36).substring(2).slice(0, 4); // base36 for nums and letters than remove `0.` than only 4 digits
};

const returnRandomUserToken = function (_) {
    return rand() + "-" + rand() + "-" + rand() + "-" + rand();
}


const createUser = (userName, language) => {
    const randToken = returnRandomUserToken();
    usersByToken[randToken] = { userName: userName, language: language }; //adding to my fake user collection
    return {
        token: randToken
    }
};

const returnUserByToken = (token) => { return usersByToken[token] }




module.exports = {
    createUser,
    returnUserByToken,
};