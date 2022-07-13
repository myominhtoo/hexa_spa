<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex">

     <Sidebar :userInfo="userInfo" :isLogin="isLogin" />

    <div id="admin-main" class="w-85 pb-5">
        <Navbar @update:infos="updateInfo" :userInfo="userInfo" :isLogin="isLogin" />

        <h1 class="my-5 thm h3 fw-bold">CREATE NEWS HERE!</h1>
         

        <form @submit.prevent="handleCreateNews" action="" class="card w-75 mx-auto p-3 text-start" enctype="multipart/form-data">
          <p v-if="status != ''" id="success" class="my-3 text-success text-start p-2">{{ status }}</p>
          <div class="form-group my-2">
            <label for="" class="form-label fw-bold txt-dark">News' Title</label>
            <input v-model="news_name" type="text" class="form-control" placeholder="e.g title about what happened">
            <span v-if="errors.news_name.hasError && errors.news_name.msg != ''" id="error" class="fw-bold text-danger my-1">{{ errors.news_name.msg }}</span>
          </div>

          <div class="form-group my-2">
            <label for="" class="form-label fw-bold txt-dark">News' Category</label>
            <select v-model="news_category" v-if="categories != null"  class="form-select text-capitalize">
              <option value="" selected disabled>Choose News' Category</option>
              <option v-for="c in categories" :key="c.news_category_id" class="text-capitalize" :value="c.news_category_id">{{ c.news_category_name }}</option>
            </select>
            <span v-if="errors.news_category.hasError && errors.news_category.msg != ''" id="error" class="fw-bold text-danger my-1">{{ errors.news_category.msg }}</span>
          </div>

          <div class="form-group my-2">
            <label for="" class="form-label fw-bold txt-dark">News' Location</label>
            <input v-model="news_location" type="text" class="form-control" placeholder="e.g Yangon">
            <span v-if="errors.news_location.hasError && errors.news_location.msg != ''" id="error" class="fw-bold text-danger my-1">{{ errors.news_location.msg }}</span>
          </div>

          <div class="form-group my-2">
            <label for="" class="form-label fw-bold txt-dark">News' Content</label>
            <textarea v-model="descriptions" cols="30" rows="10" class="form-control" placeholder="e.g detail about what happened"></textarea>
            <span v-if="errors.descriptions.hasError && errors.descriptions.msg != ''" id="error" class="fw-bold text-danger my-1">{{ errors.descriptions.msg }}</span>
          </div>

          <div class="form-group my-2">
            <label for="" class="form-label fw-bold txt-dark">News' Image</label>
            <input ref="news_img" type="file" class="form-control" id="file">
            <span v-if="errors.news_img.hasError && errors.news_img.msg != ''" id="error" class="fw-bold text-danger my-1">{{ errors.news_img.msg }}</span>
          </div>

          <div class="form-group my-2">
            <button class="btn btn-primary w-100">CREATE</button>
          </div>
        </form>
    </div>
  </main>
</template>

<script>
import Sidebar from '../../components/admin/SideBar.vue';
import Navbar from '../../components/admin/Navbar.vue';
import { mapActions, mapGetters , useStore } from 'vuex';
import axios from 'axios';
import $ from 'jquery';
import getUpdateInfo from '@/composables/getUpdateInfo';

export default {
    name : 'CreateNewsView',
    components : {
        Navbar,
        Sidebar,
    },
    data(){
      return {
       news_name : "",
       news_location : "",
       news_category : "",
       descriptions : "",
       news_img : "",
       file : {},
       errors : {
          news_name : {
            hasError : false,
            msg : "",
          },
          news_location : {
            hasError : false,
            msg : "",
          },
          news_category : {
            hasError : false,
            msg : "",
          },
          descriptions : {
            hasError : false,
            msg : "",
          },
          news_img : {
            hasError : "",
            msg : "",
          }
       },
       status : "",
      }
    },
    setup(){
       const { updateInfo } = getUpdateInfo();

        return { updateInfo };
    },
    methods : {
      async handleCreateNews(){
          this.validateInput(this.news_name)
          ? this.errors.news_name = { hasError : false , msg : "" }
          : this.errors.news_name = { hasError : true , msg : "News name must not be empty!" };

          this.validateInput(this.news_category)
          ? this.errors.news_category = { hasError : false , msg : "" }
          : this.errors.news_category = { hasError : true , msg : "News category must not be empty!" };

          this.validateInput(this.news_location)
          ? this.errors.news_location = { hasError : false , msg : "" }
          : this.errors.news_location = { hasError : true , msg : "News location must not be empty!" };
          
          this.validateInput(this.descriptions)
          ? this.errors.descriptions = { hasError : false , msg : "" }
          : this.errors.descriptions = { hasError : true , msg : "Descriptions must not be empty!" };

          this.validateImage(this.$refs.news_img.files[0]);

          const data  = {
            news_name : this.news_name,
            news_category : this.news_category,
            news_location  : this.news_location,
            descriptions : this.descriptions,
            news_img : this.news_img,
            creator_id : parseInt(window.atob(this.userInfo.user_id)),
          }

          // console.log(data);

          if(!this.errors.descriptions.hasError && !this.errors.news_category.hasError && !this.errors.news_img.hasError && !this.errors.news_location.hasError && !this.errors.news_name.hasError){

            const upload = await axios.post(`http://localhost:8080/hexa/api/upload?email=${window.atob(this.userInfo.user_email)}&_token=${window.atob(this.userInfo._token)}` , 
            {
              file : this.file,
            },{
              headers : {
                "Content-Type" : 'multipart/form-data'
              }
            });
           
           if(upload.data == "Success"){
               const res = await axios.post(`http://localhost:8080/hexa/api/createnews?email=${window.atob(this.userInfo.user_email)}&_token=${window.atob(this.userInfo._token)}` , data );
                if(res.data == "Success"){
                    this.status = "Successfully Created!!";
                    this.resetForm();
                    setTimeout(() => {
                      this.status = "";
                    } , 3000);
                }
            }
            
          }
      },
      resetForm(){
        this.news_category = "",
        this.news_img = {},
        this.news_location = "",
        this.news_name = "",
        this.descriptions = "",

        this.$refs.news_img.value = "";
      },
      validateImage( image ){
  
        if(image != undefined){

            image.type == ("image/jpg" ||  "image/png" || "image/jpeg") || (image.name != "" && image.type == "")
            ? this.errors.news_img = { hasError : true , msg : "This file type does not support!!" }
            : this.errors.news_img = { hasError : false , msg : "" };

            if(!this.errors.news_img.hasError){
               this.file = image;
               this.news_img = image.name;
            }

        }else{
          this.errors.news_img = { hasError : true , msg : "News image must not be empty!!" }
        }

      },
      validateInput( input ){
          let isEmpty = input == "" ? true : false;
          let isNull = input == null ? true : false;

          return !isEmpty && !isNull;
      },
      ...mapActions(['getUserInfo','getCategories']),
    },
    computed : {
      ...mapGetters(['userInfo','isLogin','categories']),
    },
    mounted(){
       if(document.cookie != ""){
         this.getUserInfo();
      }

      this.getCategories();
    },
}
</script>
