import { ref , reactive} from 'vue';
import $ from 'jquery';
import getCookie from '@/router/helper/getCookie';
import getSecret from './getSecret';
import { useRouter } from 'vue-router';
import axios from 'axios';

const getEditUserInfo = ( emit ) => {

    const { decode } = getSecret();
    const router = useRouter();
    
    const user_name = ref("");
    const user_email = ref("");
    const user_password = ref("");
    const errors = reactive({
        user_name : {
            hasError : false,
            msg : "",
        },
        user_email : {
            hasError : false,
            msg : "",
        },
        user_password : {
            hasError : false,
            msg : "",
        }
    });

    const handleNameClick = ( role = "") => {

      if( role == "user" || role ==  '' ){

            $("#toggle-edit-modal").click();

            let userInfo = getCookie();
            
            user_name.value = decode(userInfo['user_name']);
            user_email.value = decode(userInfo['user_email']);
            user_password.value = decode(decode(userInfo['code']));

      }else{

       role == "admin" ?  router.push("/admin") : router.push("/admin/news");

      }
        
    }


    const validateInput = ( input = "" ) => {
        let isEmpty = input == "" || null ? true : false;
        let isValid = input.includes("*") ? false : true;

        return !isEmpty && isValid;
    }

    const setAllError = () => {
         errors.user_name.hasError = true;
         errors.user_name.msg = "Something went Wrong!!";

         errors.user_email.hasError = true;
         errors.user_email.msg = "Something went Wrong!!";

         errors.user_password.hasError = true;
         errors.user_password.msg = "Something went Wrong!!";
    }

    const unsetAllError = () => {
        errors.user_name.hasError = false;
        errors.user_name.msg = "";

        errors.user_email.hasError = false;
        errors.user_email.msg = "";

        errors.user_password.hasError = false;
        errors.user_password.msg = "";
    }

    const handleEditInfoSubmit = async () => {
        let  userInfo = getCookie();
        if(validateInput(user_name.value)){
            errors.user_name.hasError = false;
            errors.user_name.msg = "";
        }else{
            errors.user_name.hasError = true;
            errors.user_name.msg = "Username must not be empty!";
        }

        if(validateInput(user_email.value)){
            errors.user_email.hasError = false;
            errors.user_email.msg = "";
        }else{
            errors.user_email.hasError = true;
            errors.user_email.msg = "Email must not be empty!";
        }

        if(validateInput(user_password.value)){
            errors.user_password.hasError = false;
            errors.user_password.msg = "";
        }else{
            errors.user_password.hasError = true;
            errors.user_password.msg = "Password must not be empty!";
        }

        if(!errors.user_email.hasError && !errors.user_name.hasError && !errors.user_password.hasError){
            const data = {
                user_id : decode(userInfo.user_id),
                user_name : user_name.value,
                user_email : user_email.value,
                user_password : user_password.value,
            }

            const res = await axios.put(`http://localhost:8080/hexa/api/users/${decode(userInfo.user_id)}/changeinfo?email=${decode(userInfo.user_email)}&_token=${decode(userInfo._token)}` , data );

            if(res.data == "Failed"){
                setAllError();
            }else if(res.data == "Duplicate" ){
                errors.user_email.hasError = true;
                errors.user_email.msg = "Email must not be duplicate!!";
            }else{
                unsetAllError();
                emit("update:infos");

                $("#toggle-edit-modal").click();
            }
        }
    }

    return { handleEditInfoSubmit , handleNameClick , user_name , user_email , user_password , errors };
}

export default getEditUserInfo;