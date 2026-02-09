import axios from "axios";

export const axiosInstance=axios.create({});

export const apiconnector=(method,url,data,headers,params)=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: data ? data:null,
        headers:headers?headers:null,
        params:params?params:null
    });
}