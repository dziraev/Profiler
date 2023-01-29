export const nullToEmptyString = (data) => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    acc[key] = data[key] == null ? '' : value;
    return acc;
  }, {});
};
