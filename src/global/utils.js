/* eslint-disable no-console */
import store from '@/global/store';
import router from '@/global/router';
import routerUrl from '@/global/routerUrl';

export default {
  getTextByLang(langObj, copy, langCode) {
    if (copy === undefined || copy === '') return '';

    if (langObj === undefined) {
      console.error('Error: Missing translation file.');
      return '';
    }

    if (langObj[copy] === undefined) {
      console.error(`Error: Translation word missing for [${copy}]`);
      return '';
    }

    return langObj[copy][langCode];
  },
  getLocalStorage(key) {
    try {
      // Try parsing the language in local storage as json object
      return localStorage[key] ? JSON.parse(localStorage.getItem(key)) : null;
    } catch (e) {
      // If something goes wrong, simply return null
      console.log(`localStorage Error on getting (${key}) Object`);
      return null;
    }
  },
  setLocalStorage(key, newData) {
    let oldData = this.getLocalStorage(key);
    oldData = oldData === null ? {} : oldData;

    try {
      localStorage.setItem(key, JSON.stringify({ ...oldData, ...newData }));
    } catch (e) {
      console.log(`localStorage Error on storing (${key}) Object`);
    }
  },
  isLoggedIn() { // extends user state format for `store.state.user.token`
    if (!store.state.user.token) {
      router.push({ name: routerUrl.Login.name });
    }
  },
  apiHeader: {
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, same-origin, *omit
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // *manual, follow, error
    referrer: 'no-referrer', // *client, no-referrer
  },
  regex: {
    email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  },
};

// export default {
//   install() {
//     Vue.kpUtils = kpUtils;
//     Vue.prototype.$kpUtils = kpUtils;
//   },
// };