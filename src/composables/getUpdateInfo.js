import getSecret from "./getSecret";
import getCookie from "@/router/helper/getCookie";
import getClearCookie from "./getClearCookie";
import getCreateCookie from "./getCreateCookie";
import axios from "axios";
import { useStore } from "vuex";


const getUpdateInfo = () => {

    const { decode } = getSecret();
    const store = useStore();

    const getInfo = () => {
          store.dispatch("getUserInfo");
    }
    
   const updateInfo = async () => {
      const oldCookieInfo = getCookie();

      const res =  await axios.get(`http://localhost:8080/hexa/api/users/${decode(oldCookieInfo.user_id)}?email=${decode(oldCookieInfo.user_email)}&_token=${decode(oldCookieInfo._token)}`);
 
     if(res.status == 200){
           getClearCookie(oldCookieInfo);
           getCreateCookie(res.data);
 
           getInfo();
     }
   }

   return { updateInfo }
    
}

export default getUpdateInfo;