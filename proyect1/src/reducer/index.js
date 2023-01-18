import { GET_CURRENCY } from "../actions";

const initialState = {
  currency: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      }

      
      default:
        return state;
  }
}
export default rootReducer;