/* eslint-disable no-console */

// LocalStorage was giving error on device such as iPad Mini
// This function simply ignores all error on localStorage setItem call
export function getLocalStorage(key) {
  try {
    // Try parsing the language in local storage as json object
    return localStorage[key] ? JSON.parse(localStorage.getItem(key)) : null;
  } catch (e) {
    // If something goes wrong, simply return null
    console.log(`localStorage Error on getting (${key}) Object`);
    return null;
  }
}

export function setLocalStorage(key, newData) {
  let oldData = getLocalStorage(key);
  oldData = oldData === null ? {} : oldData;

  try {
    localStorage.setItem(key, JSON.stringify({ ...oldData, ...newData }));
  } catch (e) {
    console.log(`localStorage Error on storing (${key}) Object`);
  }
}
