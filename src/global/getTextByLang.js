/* eslint-disable no-console */
export default (langObj, copy, langCode) => {
  if (copy === undefined || copy === '') return '';

  if (langObj === undefined) {
    console.error('Error: Missing translation file.');
    return '';
  }

  if (langObj[copy] === undefined) {
    console.error('Error: Translation word missing.');
    return '';
  }

  return langObj[copy][langCode];
};
