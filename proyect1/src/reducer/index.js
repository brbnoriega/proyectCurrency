import { GET_CURRENCY, GET_CURRENCY_COUNTRY } from "../actions";


const initialState = {
  currency: [],
  listCountrys: {}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      }
    
        case GET_CURRENCY_COUNTRY:
          return {
            ...state,
            listCountrys: action.payload,
          }
      
      default:
        return state;
  }
}
export default rootReducer;