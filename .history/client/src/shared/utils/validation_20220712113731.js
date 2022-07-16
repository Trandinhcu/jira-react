export const is = {
  match: (testFn, message = '') => (value, fieldValues) => !testFn(value, fieldValues) && message,

  required: () => value => isNilOrEmptyString(value) && 'Trường này không được để trống',

  minLength: min => value => !!value && value.length < min && `Tối thiểu phải ${min} kí tự`,

  maxLength: max => value => !!value && value.length > max && `Tối đa phải ${max} kí tự`,

  notEmptyArray: () => value =>
    Array.isArray(value) && value.length === 0 && 'Vui lòng chọn tổi thiếu 1',

  email: () => value => !!value && !/.+@.+\..+/.test(value) && 'Phải là email hợp lệ',

  url: () => value =>
    !!value &&
    // eslint-disable-next-line no-useless-escape
    !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value) &&
    'Must be a valid URL',
};

const isNilOrEmptyString = value => value === undefined || value === null || value === '';

export const generateErrors = (fieldValues, fieldValidators) => {
  const errors = {};

  Object.entries(fieldValidators).forEach(([fieldName, validators]) => {
    [validators].flat().forEach(validator => {
      const errorMessage = validator(fieldValues[fieldName], fieldValues);
      if (errorMessage && !errors[fieldName]) {
        errors[fieldName] = errorMessage;
      }
    });
  });
  return errors;
};
