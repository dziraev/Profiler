export const nullToEmptyString = (data) => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    acc[key] =
      data[key] == null ? '' : typeof data[key] === 'object' ? nullToEmptyString(data[key]) : value;
    return acc;
  }, {});
};
