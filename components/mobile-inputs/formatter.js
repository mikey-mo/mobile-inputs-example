const formatting = {
  1: (value) => {
    const splitValue = value.match(/^(\d{3})(\d{3})(\d{4})$/);
    return `(${splitValue[1]}) ${splitValue[2]} ${splitValue[3]}`;
  },
  44: (value) => {
    const splitValue = value.match(/^(\d{1})(\d{4})(\d{6})$/);
    return `(${splitValue[1]})${splitValue[2]} ${splitValue[3]}`;
  },
};

export default formatting;
