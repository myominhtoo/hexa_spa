import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import getSecret from "./getSecret";

const getLogout = () => {

    const store = useStore();
    const router = useRouter();

    const { encode , decode } = getSecret();

    const clearSession = ( info ) => {
        store.dispatch('removeUserInfo', info )
    }

    const handleLogout = async ( info ) => {
        swal({
            text : `Are you Sure to Logout, ${decode(info.user_name)}?`,
            icon : "warning",
            buttons : ['No','Yes']
        }).then(async (willLogout) => {
            if(willLogout){
                
                const res = await axios.get(`http://localhost:8080/hexa/api/logout?email=${window.atob(info.user_email)}`);
                
                if(res.data == "Success"){
                        clearSession(info);

                        localStorage.removeItem("curPage");
                        localStorage.removeItem("animateDone");

                        router.push({
                            path : "/login",
                            query : {
                                status : "Successfully Logout!",
                            }
                    });
                }
                            
            }
        });
    }

    return { handleLogout };
}

export default getLogout;