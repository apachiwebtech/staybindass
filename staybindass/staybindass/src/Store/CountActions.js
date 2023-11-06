import { CountActions } from "./CountSlice";
import axios from "axios";

export const getCount = ()=>{
    return async (dispatch)=>{
        const data = {
                        userid: localStorage.getItem('userId'),
                      };
                  
                  axios
                    .post('http://localhost:8081/count', data)
                    .then((res) => {
                    
                      console.log(res)
                      dispatch(CountActions.getCount({
                        count : res.data,
                      }))
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
    }
