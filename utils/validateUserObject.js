const userKeys = ['localId', 'email', 'displayName', 'emailVerified'];

export default function(userObj) {
  if (typeof userObj !== 'object' && userObj !== null) {
    /* eslint-disable-next-line */
    return console.error('Invalid parameter type');
  }

  return userKeys.every((key) =>
    Object.prototype.hasOwnProperty.call(userObj, key)
  );
}
