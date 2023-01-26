export const getChangedValues = (values, initialValues) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    if (typeof initialValues[key] === 'string') {
      initialValues[key] = initialValues[key] || null;
    }

    const hasChanged = initialValues[key] !== value;

    if (hasChanged && value === null) {
      return values;
    }

    if (hasChanged) {
      acc[key] = value || null;
    }

    return acc;
  }, {});
};
