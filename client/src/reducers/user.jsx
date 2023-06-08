
const userstate = {
  name: 'user',
  login: false,
  email: '',
  isEmail: true,
  phone: '',
  address: '',
};

const userreducer = (state = userstate, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        ...state,
        login: true,
        name: action.payload.products.name,
        email: action.payload.products.email,
        isEmail: action.payload.products.isEmail,
        address: action.payload.products.address,
        phone: action.payload.products.phone,
      };
    default: return {
      ...state,
      login: false,
      name: 'user',
      email: '',
      isEmail: true,
      address: '',
      phone: '',
    };
  }
};

export default userreducer;
