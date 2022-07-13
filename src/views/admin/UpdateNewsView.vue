<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex">

     <Sidebar :userInfo="userInfo" :isLogin="isLogin" />

    <div id="admin-main" class="w-85 pb-5">
        <Navbar @update:infos="updateInfo" :userInfo="userInfo" :isLogin="isLogin" />

        <h1 class="my-5 thm h3 fw-bold">UPDATE NEWS HERE!</h1>

        <p v-if="status != '' && statusError" id="status" class="my-3 text-danger text-start p-2 w-75 mx-auto">{{ status }}</p>
        <form @submit.prevent="handleUpdateNews" action="" class="card w-75 mx-auto p-3 text-start" enctype="multipart/form-data">
          <div class="form-group my-2">
            <label for="" class="form-label fw-bold txt-dark">News' Title</label>
            <input v-model="news_name" type="text" class="form-control" placeholder="e.g title about what happened">
            <span v-if="errors.news_name.hasError && errors.news_name.msg != ''" id="error" class="fw-bold text-danger my-1">{{ errors.news_name.msg }}</span>
          </div>

          <div class="form-group my-2">
            <label for="" class="form-label fw-bold txt-dark">News' Category</label>
            <select v-model="news_category" v-if="categories != null" name="" id="" class="form-select text-capitalize">
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
            <textarea v-model="descriptions" name="" id="" cols="30" rows="10" class="form-control" placeholder="e.g detail about what happened"></textarea>
            <span v-if="errors.descriptions.hasError && errors.descriptions.msg != ''" id="error" class="fw-bold text-danger my-1">{{ errors.descriptions.msg }}</span>
          </div>

          <div class="form-group my-2 d-flex flex-column ">
            <label for="" class="form-label fw-bold txt-dark">News' Image <span @click="resetToOriginImage"  v-if="showResetImgBtn" class="text-primary text-decoration-underline fw-bold mx-2" style="font-size:13px;">Reset Image</span></label>
            <img :src="'http://localhost:8080/img/'+news_img" class="my-2" alt="image" style="width:400px;height:250px;">
            <input @change="validateImage($refs.news_img.files[0])" ref="news_img" type="file" class="form-control" id="file" />
            <span v-if="errors.news_img.hasError && errors.news_img.msg != ''" id="error" class="fw-bold text-danger my-1">{{ errors.news_img.msg }}</span>
          </div>

          <div class="form-group my-2">
            <button class="btn btn-primary w-100">UPDATE</button>
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
    name : 'UpdateNewsView',
    components : {
        Navbar,
        Sidebar,
    },
    data(){
      return {
       showResetImgBtn : false,
       news_id : "",
       prev_img : "",
       news_name : "",
       news_location : "",
       news_category : "hello",
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
       statusError : false,
      }
    },
    setup(){
    const { updateInfo } = getUpdateInfo();
      return { updateInfo };
    },
    methods : {
        test(){
            console.log("changes")
        },
      async getNewsData( newsId ){
        const data = await axios.get(`http://localhost:8080/hexa/api/news/${newsId}`).then( res => res.data);

         this.news_name = data.news_name;
         this.news_location = data.news_location;
         this.news_category = data.news_category;
         this.news_img  = data.news_img;
         this.prev_img = data.news_img;
         this.news_id = data.news_id;
         this.descriptions = data.descriptions;

      },
      async handleUpdateNews(){
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

          let image = this.$refs.news_img.files[0];

          if( image  != undefined ){
             this.validateImage(image);
          }

          const data  = {
            news_name : this.news_name,
            news_category : this.news_category,
            news_location  : this.news_location,
            descriptions : this.descriptions,
            news_img : this.news_img,
            news_id : this.news_id,
            creator_id : parseInt(window.atob(this.userInfo.user_id)),
          }



          if(!this.errors.descriptions.hasError && !this.errors.news_category.hasError && !this.errors.news_img.hasError && !this.errors.news_location.hasError && !this.errors.news_name.hasError){
            
            if(this.$refs.news_img.files[0] != undefined){
                  const  upload = await axios.post(`http://localhost:8080/hexa/api/upload?email=${window.atob(this.userInfo.user_email)}&_token=${window.atob(this.userInfo._token)}` , 
                                        {
                                            file : this.file,
                                        },{
                                             headers : {
                                                "Content-Type" : 'multipart/form-data'
                                        }
                                   });            
            }
    
            const res = await axios.put(`http://localhost:8080/hexa/api/news/${this.news_id}/update?email=${window.atob(this.userInfo.user_email)}&_token=${window.atob(this.userInfo._token)}` , data );
             
             if(res.status == 200 ){
                    this.$router.push("/admin/news?status=Successfully Updated!");
             }else{
                this.statusError = true;
                this.status = "Something went wrong!";
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
             this.showResetImgBtn  = true;

        }else{
          this.errors.news_img = { hasError : true , msg : "News image must not be empty!!" }
        }

      },
      validateInput( input ){
          let isEmpty = input == "" ? true : false;
          let isNull = input == null ? true : false;

          return !isEmpty && !isNull;
      },
      resetToOriginImage(){
        this.news_img = this.prev_img;
        this.$refs.news_img.value = "";
        this.errors.news_img = { hasError : false , msg : "" };

        this.showResetImgBtn = false;
      },
      ...mapActions(['getUserInfo','getCategories']),
    },
    computed : {
      ...mapGetters(['userInfo','isLogin','categories']),
    },
    mounted(){
       if(document.cookie != ""){
         this.getUserInfo();
        
        this.getNewsData( parseInt(this.$route.params.newsId) );
      }

      this.getCategories();
    },
}
</script>
