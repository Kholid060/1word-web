export function isObject(data) {
  return typeof data === 'object' && data !== null;
}

export function validateUser(userObj) {
  const userKeys = ['localId', 'email', 'displayName', 'emailVerified'];

  if (!isObject(userObj)) {
    /* eslint-disable-next-line */
    return console.error('Invalid parameter type');
  }

  return userKeys.every((key) =>
    Object.prototype.hasOwnProperty.call(userObj, key)
  );
}

export function validateWord(word, { learnId, title }) {
  return (
    word.learnId === learnId && word.title.toLowerCase() === title.toLowerCase()
  );
}

export function normalizeData(objData, langId) {
  if (!isObject(objData)) {
    /* eslint-disable-next-line */
    console.error('Data must be an object');

    return;
  }

  return Object.keys(objData).map((id) => ({
    ...objData[id],
    id,
    langId
  }));
}

export function isEmptyObject(obj) {
  return isObject(obj) && Object.keys(obj).length === 0;
}
