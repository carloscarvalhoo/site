function isValidNumber(value) {
    const number = parseInt(value, 10);
    return !isNaN(number);
}

function isValidDecimal(value) {
    const number = parseFloat(value);
    return !isNaN(number) && isFinite(number);
}

function isValidString(str) {
    return str && str.trim().length > 0 && str.trim().length <= 255;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email && re.test(email);
}

function isValidPassword(password) {
    return typeof password === 'string' && password.length >= 6;
}

module.exports = {
    isValidNumber,
    isValidDecimal,
    isValidString,
    isValidEmail,
    isValidPassword
};