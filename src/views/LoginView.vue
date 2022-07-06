<template>

  <section id="login-main" class="container-fluid row d-flex justify-content-center align-items-center p-0 m-0">

      <main class="card p-3 col-xl-3 col-md-7 col-lg-4 col-sm-10">

        <header class="card-header">
            <h3 class="h3 text-center fw-bold txt-dark">Hexa</h3>
        </header>

        <form action="" class="card-body" @submit.prevent="handleLoginSubmit">
            <div class="form-group my-2 text-start">
              <label for="" class="form-label fw-bold txt-dark">Email Address</label>
              <input type="text" class="form-control" v-model="user.user_email" placeholder="Your Email Address">
              <span v-show="errors.user_email.hasError" class="text-danger fw-bold" id="error">{{ errors.user_email.msg }}</span> 
              <i class="fa-solid fa-envelope txt-dark" :class="{'error' : errors.user_email.hasError}"></i>
            </div>

            <div class="form-group my-2 text-start">
              <label for="" class="form-label fw-bold txt-dark">Password</label>
              <input type="password" class="form-control" v-model="user.user_password" placeholder="Your Password">
              <span v-show="errors.user_password.hasError" class="text-danger fw-bold" id="error">{{ errors.user_password.msg }}</span> 
              <i class="fa-solid fa-lock txt-dark" :class="{'error' : errors.user_password.hasError}"></i>
            </div>

            <div class="form-group my-2">
              <button class="btn btn-primary w-100 btn-sm">Login</button>
            </div>

            <div class="form-group d-flex justify-content-between align-item-center my-2">
              <router-link to="/" class="text-danger">Back</router-link>
              <router-link to="/register">Create?</router-link>
            </div>
        </form>

      </main>
      
      <Footer/>
  </section>

</template>

<script>
import axios from 'axios';
import Footer from '../components/public/Footer.vue';

export default {
  name : 'LoginView',
  components : {
    Footer
  },
  data(){
    return {
      user : {
        user_email: "",
        user_password : "",
      },
      errors : {
        user_email : {
          hasError : false,
          msg : "",
        },
        user_password : {
          hasError : false,
          msg : "",
        }
      }
    }
  },
  methods : {
    async handleLoginSubmit(){
      
      !this.validateInput(this.user.user_email)
      ? this.errors.user_email = { hasError : true , msg : "Email address must not be empty!" }
      : this.errors.user_email = { hasError : false , msg : "" };

      !this.validateInput(this.user.user_password)
      ? this.errors.user_password = { hasError : true , msg : "Password must not be empty!" }
      : this.errors.user_password = { hasError : false , msg : "" };

      if(!this.errors.user_email.hasError && !this.errors.user_password.hasError){
         const res = await axios.post('http://localhost:8080/hexa/api/login',this.user);
         
         const user = res.data;

         if(user.user_email == null || user.user_name == null || user._token == 0){
            this.errors.user_email = { hasError : true , msg : "Invalid Email or Password!" };
            this.errors.user_password = { hasError : true , msg : "Invalid Email or Password! " };
         }else{      
            document.cookie = `user_name=${user.user_name}; Secure`;
            document.cookie = `user_id=${user.user_id}`;
            document.cookie = `user_email=${user.user_email}; Secure`;
            document.cookie = `user_role=${user.user_role}; Secure`;
            document.cookie = `_token=${user._token}; Secure`;
            
            this.resetForm();
            
            if(user.user_role == "reporter" || user.user_role == "admin" ) this.$router.push("/admin");
            else this.$router.push("/");
         }
      }
    },
    validateInput( data , isUnique = false ){
       let isEmpty = data == "" ? true : false ; 
       let isInValid = data.split("").includes("*") ? true : false ; 
       let isDuplicate = !isUnique 
                                 ? false
                                 : this.emails.includes(data);
      
      return !isEmpty && !isInValid && !isDuplicate;
    },
    resetForm(){
      this.user = { user_email : "" , user_password : "" };
    }
  }
}
</script>
