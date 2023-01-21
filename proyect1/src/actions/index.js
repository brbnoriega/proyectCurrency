import axios from "axios";
export const GET_CURRENCY = "GET_CURRENCY";
export const GET_CURRENCY_COUNTRY = "GET_CURRENCY_COUNTRY";
export const GET_CONVERT = "GET_CONVERT";

export function getCurrency() {
  return async function (dispatch) {
    try {
      var getCurrencyApi = await axios.get(
        "https://api.getgeoapi.com/v2/currency/convert?api_key=ee608308465eb4ed2831a7ad0e067d58e5908569&from=ARS"
      );
      console.log(getCurrencyApi.data);
      return dispatch({
        type: GET_CURRENCY,
        payload: getCurrencyApi.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function getListCountrys() {
  return async function (dispatch) {
    try {
      var getListCountrysApi = await axios.get(
        "https://api.getgeoapi.com/v2/currency/list?api_key=ee608308465eb4ed2831a7ad0e067d58e5908569&format=json"
      );
      console.log(getListCountrysApi.data);
      return dispatch({
        type: GET_CURRENCY_COUNTRY,
        payload: getListCountrysApi.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function getConvert(curr1, curr2) {
  return async function (dispatch) {
    try {
      var getConvertApi = await axios.get(
        `https://api.getgeoapi.com/v2/currency/convert?api_key=ee608308465eb4ed2831a7ad0e067d58e5908569&from=${curr1}&to=${curr2}`
      );
     
      return dispatch({
        type: GET_CONVERT,
        payload: getConvertApi.data.rates[curr2].rate
        
      });
      
    } catch (error) {
      return error;
    }
  };
}
