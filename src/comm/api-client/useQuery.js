import axios from "axios";

export const useQueryMap = async (url, data, options) => {
    const resultMap = {};
    let rstData = null;
    let rstStaus = "";
    let rstMessage = "";
    const reqUrl = ("http://localhost:8099/" + url);

    try{
        const resp = await axios.post(reqUrl, data, options);
        rstData = resp.data;
        rstStaus = resp.status;
        rstMessage = resp.message;
    }catch(error){
        rstStaus = resp.status;
        rstMessage = resp.message;
    }finally{
    }
    resultMap["status"] = rstStaus;
    resultMap["data"] = rstStaus;
    resultMap["message"] = rstMessage;

    return resultMap;
}