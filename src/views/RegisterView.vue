<template>

  <section id="register-main" class="container-fluid row d-flex justify-content-center align-items-center p-0 m-0 ">

      <main class="card p-3 col-xl-3 col-md-7 col-lg-4 col-sm-8">

        <header class="card-header">
            <h3 class="h3 text-center fw-bold txt-dark">Hexa</h3>
        </header>

        <form  class="card-body" @submit.prevent="handleRegisterSubmit">
             <div class="form-group my-2 text-start">
              <label for="" class="form-label fw-bold txt-dark">Username </label>
              <input type="text" class="form-control" v-model="user.user_name" placeholder="Your name">
              <span v-show="errors.user_name.hasError" class="text-danger fw-bold" id="error">{{ errors.user_name.msg }}</span> 
              <i class="fa-solid fa-user txt-dark" :class="{'error' : errors.user_name.hasError }"></i>
            </div>

            <div class="form-group my-2 text-start">
              <label for="" class="form-label fw-bold txt-dark">Email Address</label>
              <input type="text" class="form-control" v-model="user.user_email" placeholder="Your Email Address">
              <span v-show="errors.user_email.hasError" class="text-danger fw-bold" id="error">{{ errors.user_email.msg }}</span> 
              <i class="fa-solid fa-envelope  txt-dark" :class="{'error' : errors.user_email.hasError}"></i>
            </div>

            <div class="form-group my-2 text-start">
              <label for="" class="form-label fw-bold txt-dark">Password </label>
              <input type="password" class="form-control" v-model="user.user_password" placeholder="Your Password">
              <span v-show="errors.user_password.hasError" class="text-danger fw-bold" id="error">{{ errors.user_password.msg }}</span> 
              <i class="fa-solid fa-lock  txt-dark" :class="{'error' : errors.user_password.hasError}"></i>
            </div>

            <div class="form-group my-2">
              <button class="btn btn-primary w-100 btn-sm">Register</button>
            </div>

            <div class="form-group d-flex justify-content-between align-item-center my-2">
              <router-link to="/" class="text-danger text-decoration-underline">Home Page</router-link>
              <router-link to="/login">Already?</router-link>
            </div>
        </form>

      </main>
      
      <Footer/>
  </section>

</template>

<script>
import axios from 'axios';
import Footer from '../components/public/Footer.vue';
import { mapActions, mapGetters } from 'vuex';
import getSetTitle from '@/composables/getSetTitle';


export default {
  name : 'LoginView',
  components : {
    Footer
  },
  data(){
    return {
      user : {
        user_name : "",
        user_email :"",
        user_password:"",
      },
      errors : {
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
      }
    }
  },
  methods : {
    handleRegisterSubmit(){
  
        !this.validateInput(this.user.user_name)
         ? this.errors.user_name = { hasError : true , msg : "Username must not be empty!" }
         : this.errors.user_name = { hasError : false , msg : ""};

        !this.validateInput(this.user.user_email,true) 
        ?  this.errors.user_email = { hasError  : true , msg : "Email Address must not be empty or unique!" }
        : this.errors.user_email = { hasError : false , msg : "" };

        !this.validateInput(this.user.user_password)
        ? this.errors.user_password = { hasError : true , msg : "Password must not be empty!" }
        : this.errors.user_password = { hasError : false , msg : "" };

        if(!this.errors.user_name.hasError && !this.errors.user_email.hasError  && !this.errors.user_password.hasError ){
          this.registerUser(this.user);
          this.user = { user_name : "" , user_email : "" , user_password : "" };
          this.$router.push("/login");
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
    async registerUser( data ){
      const res = await axios.post('http://localhost:8080/hexa/api/register' , this.user );
    }, 
    ...mapActions(['getUsers','getEmails']),
  },
  computed : {
    ...mapGetters(['users','emails']),
  },
  created(){
    this.getUsers();
    this.getEmails();

    getSetTitle("hexa | register");
  },
}
</script>
