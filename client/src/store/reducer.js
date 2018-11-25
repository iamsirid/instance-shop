import * as actionTypes from "./actions";

// const initialState = {
//   isLogin: true,
//   ssn: "1106702419878",
//   role: "customer",
//   name: "Rit"
// };
const initialState = {
  isLogin: false,
  ssn: "",
  role: "",
  name: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLogin: true,
        ssn: action.ssn,
        role: action.role,
        name: action.name
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogin: false,
        ssn: "",
        role: "",
        name: ""
      };
    case actionTypes.CHANGE_NAME:
      return {
        ...state,

        name: action.name
      };
    default:
  }
  return state;
};

export default reducer;
