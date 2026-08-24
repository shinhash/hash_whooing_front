import axios from "axios";

export const useQueryMap = async (reqUrl, dataMap, options) => {
    const resultMap = {};
    let rstData = null;
    let rstStaus = "";
    let rstMessage = "";

    try{
        LoadingProcess(true);
        const resp = await axios.post(reqUrl, dataMap, options);
        rstData = resp.data;
        rstStaus = resp.status;
        rstMessage = resp.message;
    }catch(error){
        rstMessage = resp.message;
    }finally{
        LoadingProcess(false);
    }

}

const LoadingProcess = (isLoading) => {
    const loadingBar = document.getElementById("loadingbar");
    if(loadingBar){
        if(isLoading){ loadingBar.style.display = "block"; }
        else{ loadingBar.style.display = "none"; }
    }
}