import {  reactive } from 'vue';

const getUser = () => {

    const user = reactive({
        user_name : "",
        user_email : "",
        user_password:"",
    });

    const errors  = reactive({
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

    const validateInput = ( data , isUnique = true ) => {
       let isEmpty = data == "" ? true : false ; 
       let isInValid = data.split("").includes("*") ? true : false ; 
       let isDuplicate = !isUnique 
                                 ? false
                                 : this.emails.includes(data);
      
      return !isEmpty && !isInValid && !isDuplicate;
    };

    const registerUser = async ( data ) => {
        const res = await axios.post('http://localhost:8080/hexa/api/register' , this.user );
    }

    const handleRegisterSubmit = () => {
        !validateInput(user.user_name)
        ? errors.user_name = { hasError : true , msg : "Username must not be empty!" }
        : errors.user_name = { hasError : false , msg : ""};

       !validateInput(user.user_email,true) 
       ?  errors.user_email = { hasError  : true , msg : "Email Address must not be empty or unique!" }
       : errors.user_email = { hasError : false , msg : "" };

       !validateInput(user.user_password)
       ? errors.user_password = { hasError : true , msg : "Password must not be empty!" }
       : errors.user_password = { hasError : false , msg : "" };

       if(!errors.user_name.hasError && !errors.user_email.hasError  && !errors.user_password.hasError ){
         registerUser(this.user);
         user = { user_name : "" , user_email : "" , user_password : "" };
         this.$router.push("/login");
       }
    }

    return { user , errors , validateInput };
}

export default getUser;