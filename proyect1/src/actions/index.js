import axios from 'axios';
export const GET_CURRENCY = 'GET_CURRENCY'


export function getCurrency(){
    return async function(dispatch){ 
        try{
             var getCurrencyApi = await axios.get('https://api.bluelytics.com.ar/v2/latest')
                console.log(getCurrencyApi.data)
             return dispatch({
                    type: GET_CURRENCY,
                    payload: getCurrencyApi.data
             })  }catch(error){
            return error;
            }}}