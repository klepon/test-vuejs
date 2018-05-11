/* eslint-disable no-console */
import store from '@/global/store';
import router from '@/global/router';
import routerUrlObj from '@/global/routerUrl';
import utilLang from '@/global/_util.lang';

export default {
  getTextByLang(langObj, copyCode) {
    if (copyCode === undefined || copyCode === '') return '';

    if (langObj === undefined) {
      console.error('Error: Missing translation file.');
      return '';
    }

    if (langObj[copyCode] === undefined) {
      console.error(`Error: Translation word missing for [${copyCode}]`);
      return '';
    }

    if (langObj[copyCode][store.state.setup.lang] === undefined) {
      if (langObj[copyCode].en !== undefined) {
        store.state.setup.lang = 'en';
      }
    }

    return langObj[copyCode][store.state.setup.lang];
  },
  getLocalStorage(key) {
    try {
      return localStorage[key] ? JSON.parse(localStorage.getItem(key)) : null;
    } catch (e) {
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
  getStringLocalStorage(key) {
    try {
      return localStorage[key] ? localStorage.getItem(key) : null;
    } catch (e) {
      console.log(`localStorage Error on getting (${key}) object`);
      return null;
    }
  },
  setStringLocalStorage(key, newStringData) {
    try {
      localStorage.setItem(key, `${newStringData}`);
    } catch (e) {
      console.log(`localStorage Error on storing (${key}) object`);
    }
  },
  isLoggedIn(to) { // following user store format for `store.state.user.token`
    if (!store.state.user.token) {
      if (to.name !== this.routerUrl.Login.name) {
        router.push({ name: this.routerUrl.Login.name });
      }
    }
  },
  isAdmin() {
    return store.state.user.admin;
  },
  modalServerError(err) {
    this.textModal({
      title: this.e('warningTitle'),
      message: this.e(err && err.message === 'Failed to fetch' ? 'serverError' : 'unknowError'),
    });
  },
  modalWarning(data) {
    this.textModal({
      ...data,
      title: this.e('warningTitle'),
    });
  },
  textModal(data) {
    store.commit('setModal', data);
  },
  date(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = `0${dt}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    return (`${year}-${month}-${dt}`);
  },
  isError(data) {
    return data.error !== undefined;
  },
  getErrorName(data) {
    return data.error !== undefined ? data.error.name : '';
  },
  getErrorMessage(data, e) {
    return data.error !== undefined ? e(data.error.message) : '';
  },
  e(copyCode) {
    return this.getTextByLang(utilLang, copyCode, store.state.setup.lang);
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
  routerUrl: { ...routerUrlObj },
};
