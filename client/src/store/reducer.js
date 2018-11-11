import * as actionTypes from "./actions";

const initialState = {
  isLogin: false,
  ssn: "",
  role: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLogin: true,
        ssn: action.ssn,
        role: action.role
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogin: false,
        ssn: "",
        role: ""
      };
    default:
  }
  return state;
};

export default reducer;
