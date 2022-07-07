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

    const handleLogout = ( info ) => {
        swal({
            text : `Are you Sure to Logout, ${decode(info.user_name)}?`,
            icon : "warning",
            buttons : ['No','Yes']
        }).then((willLogout) => {
            if(willLogout){
                clearSession(info);
                                
                router.push({
                    path : "/login",
                    query : {
                        status : "Successfully Logout!",
                    }
               });
            }
        });
    }

    return { handleLogout };
}

export default getLogout;