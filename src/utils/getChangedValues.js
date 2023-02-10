export const getChangedValues = (values, initialValues) => {
  const acc = {};
  for (const [key, value] of Object.entries(values)) {
    if (typeof initialValues[key] === 'string') {
      initialValues[key] = initialValues[key] || null;
    }

    const hasChanged = initialValues[key] !== value;

    if (value === null) {
      return values;
    }

    // if (hasChanged && value === null) {
    //   return values;
    // }

    if (hasChanged) {
      acc[key] = value;
    }
  }
  return acc;
};
