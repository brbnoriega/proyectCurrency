import { GET_CURRENCY, GET_CURRENCY_COUNTRY, GET_CONVERT } from "../actions";

const initialState = {
  currency: [],
  listCountrys: {},
  convertion: 0,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };

    case GET_CURRENCY_COUNTRY:
      return {
        ...state,
        listCountrys: action.payload,
      };
    case GET_CONVERT:
      return {
        ...state,
        convertion: action.payload,
      };

    default:
      return state;
  }
}
export default rootReducer;
