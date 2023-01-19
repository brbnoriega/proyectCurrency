import axios from 'axios';
export const GET_CURRENCY = 'GET_CURRENCY';
export const GET_CURRENCY_COUNTRY = 'GET_CURRENCY_COUNTRY';


export function getCurrency(){
    return async function(dispatch){ 
        try{
             var getCurrencyApi = await axios.get('https://api.getgeoapi.com/v2/currency/convert?api_key=25d1253d424a787ffbbcba5e9b4f4c70e692dfca&from=ARS')
                console.log(getCurrencyApi.data)
             return dispatch({
                    type: GET_CURRENCY,
                    payload: getCurrencyApi.data
             })  }catch(error){
            return error;
            }}
        
        
        }


        export function getListCountrys(){
            return async function(dispatch){ 
                try{
                     var getListCountrysApi = await axios.get('https://api.getgeoapi.com/v2/currency/list?api_key=25d1253d424a787ffbbcba5e9b4f4c70e692dfca&format=json')
                        console.log(getListCountrysApi.data)
                     return dispatch({
                            type: GET_CURRENCY_COUNTRY,
                            payload: getListCountrysApi.data
                     })  }catch(error){
                    return error;
                    }}
                
        }