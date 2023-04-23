const isEmail = (username) => username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

module.exports = {
    isEmail,
};
