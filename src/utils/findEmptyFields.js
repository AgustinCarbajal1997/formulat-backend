const findEmptyFields = (object) => {
    const result = Object.values(object).some(item => !item);
    return result;
}
module.exports = findEmptyFields;