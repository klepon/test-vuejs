export default (langObj, copy, langCode) => {
  if (copy === undefined || copy === '') return '';
  if (langObj[copy] === undefined) return '';
  return langObj[copy][langCode];
};
