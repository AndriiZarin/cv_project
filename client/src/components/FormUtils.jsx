const setValue = {
  text: (v) => v,
  date: (v) => v,
  checkbox: (v) => v,
  email: (v) => v,
  textarea: (v) => v,
  password: (v) => v,
  number: (v) => {
    let value = parseFloat(v);
    value = isNaN(value) || value === 0 ? "" : Math.abs(value);
    return value;
  },
};

const setFormObj = (data, fn) => ({ target }) => {
  const value = target.type === "checkbox" ? target.checked : target.value;
  return fn({ ...data, [target.name]: setValue[target.type](value) });
};

export default setFormObj;
