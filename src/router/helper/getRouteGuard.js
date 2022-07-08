//to get cookie
import getCookie from '@/router/helper/getCookie.js';

const getRouteGuard = () => {

    const forAdmin = ( to , from)  => {
        let data = getCookie();
        
        let role = data == ""  
                    ?  ""
                    : window.atob(data.user_role);

        let result;

        switch(role){
            case "admin" : result = true ; break;
            case  "reporter" : result = "/admin/news" ; break;
            default  : result = "/login?status=Please login to continue!" ; break;
        }
        
        return result;
    }

    const forAdminAndReporter = ( to , from , next ) => {
        let data = getCookie();
        
        let role = data == ""
                   ? ""
                   : window.atob(data.user_role);

        switch(role){
            case  "admin" : 
            case "reporter" : 
                        next() ; break ; 
            default : next({ path : "/login" , query : {
                status : "Please login to continue!",
            }})
        }

    }

    return { forAdmin , forAdminAndReporter };
}

export default getRouteGuard;