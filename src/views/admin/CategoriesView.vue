<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex">

     <Sidebar :userInfo="userInfo" :isLogin="isLogin" />

    <div id="admin-main" class="w-85 pb-5">
        <Navbar :userInfo="userInfo" :isLogin="isLogin"/>

        <h1 class="my-5 thm h3 fw-bold">CATEGORIES' INFORMATION</h1>
        <div v-if="fullCategories != null && categories == null"  class="container p-0" :class="{'text-end' : status == '' ? true : false , 'd-flex justify-content-between' : status == '' ? false : true}">
            <p v-show="status != ''" class="fw-bold" style="transform:translateX(70%);"><span :class="{'text-success' : statusError ? false : true , 'text-danger' : statusError ? true : false}">{{ status }}</span></p>
           <button class="btn btn-sm txt-light fw-bold btn-success text-end" style="transform:translateX(-150%);" data-bs-toggle="modal" data-bs-target="#create-modal"><i class="fa-solid fa-circle-plus mx-1" ></i>Create</button>
        </div>

        <div class="modal fade" id="create-modal">

          <div class="modal-dialog modal-dialog-centered p-3">

            <div class="modal-content p-2">
              <header class="modal-header">
                <i class="btn-close" data-bs-dismiss="modal" data-bs-target="#create-modal"></i>
              </header>

              <form @submit.prevent="handleCreateCategory" action="" class="modal-body">
                <div class="form-group my-2 text-start">
                    <label for="" class="form-label my-1   txt-dark">Category Name</label>
                    <input v-model="category" type="text" class="form-control" placeholder="e.g sport " autofocus/>
                    <span v-if="error.hasError && error.msg != ''" class="fw-bold text-danger">{{ error.msg }}</span>
                </div>

                <div class="form-group my-2  text-end">
                   <button class="btn btn-success btn-sm fw-bold txt-">Create</button>
                </div>
              </form>

            </div>

          </div>

        </div>

        <div v-if="categories != null && !isLoading ">
           <Table :columns="columns" :datas="categories" :hasAction="false">
              <!-- <template v-slot:action>
                  <td class="d-flex gap-2 justify-content-start px-3">
                    <button class="btn btn-warning btn-sm">Update</button>
                    <button class="btn btn-danger btn-sm ">Delete</button>
                  </td>
              </template> -->
          </Table>
        </div>

         <div v-if="fullCategories != null && !isLoading">
           <Table :columns="adminColumns" :datas="fullCategories">
              <template v-slot:action>
                  <td class="d-flex gap-2 justify-content-start px-3">
                    <span id="modal-toggle-btn" data-bs-toggle="modal" data-bs-target="#update-modal"></span>
                    <button @click="handleUpdateClick" class="btn btn-warning btn-sm txt-dark fw-bold" >Update</button>
                    <button @click="handleDeleteCategory" class="btn btn-danger btn-sm txt-light fw-bold">Delete</button>
                  </td>
              </template>
          </Table>
        </div>

        <!-- update modal -->
          <div class="modal fade" id="update-modal">

                 <div class="modal-dialog modal-dialog-centered">

                      <div class="modal-content p-3">
                          <div class="modal-header">
                              <i class="btn-close" data-bs-dismiss="modal" data-bs-target="#update-modal"></i>
                          </div>
                          <form @submit.prevent="handleUpdateCategory" id="update-form" action="" class="modal-body">

                              <div class="form-group my-2 text-start">
                                  <label for="" class="form-label txt-dark">Category Name</label>
                                  <input v-model="category" type="text" class="form-control" placeholder="e.g category name">
                                  <span v-if="error.hasError && error.msg != ''" class="fw-bold text-danger" id="error">{{ error.msg }}</span>
                              </div>

                              <div class="form-group my-2 text-end">
                                    <button type="submit" class="btn btn-warning btn-sm fw-bold txt-dark">Update</button>
                              </div>

                          </form>
                        </div>
                  </div>

          </div>
        
        <div v-if="isLoading">
           Loading...
        </div>
    </div>
  </main>
</template>

<script>
import Sidebar from '../../components/admin/SideBar.vue';
import Navbar from '../../components/admin/Navbar.vue';
import Table from '../../components/admin/Table.vue';
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert';

export default {
    name : 'CategoriesView',
    components : {
        Navbar,
        Sidebar,
        Table
    },
    data(){
      return {
        columns :['news_category_name'],
        isLoading : true,
        adminColumns : ['news_category_name','news_count'],
        category : "",
        error : {
          hasError : false,
          msg : ""
        },
        status : "",
        statusError : false,
        id : 0,
      }
    },
    methods : {
      async handleCreateCategory(){
        !this.validateInput( this.category) 
        ? this.error = { hasError  : true  , msg : "Category must not be empty!" }
        : this.error = { hasError  : false  , msg : "" };

        if(!this.error.hasError){
           const res = await axios.post(`http://localhost:8080/hexa/api/createcategory?email=${window.atob(this.userInfo.user_email)}&_token=${window.atob(this.userInfo._token)}` , {
              news_category_name : this.category.toLowerCase(),
           });

           if(res.data == 'Duplicate'){
              this.error = { hasError  : true  , msg : "Category must not be duplicate!" };
           }else if(res.data == 'Failed'){
              this.error = { hasError  : true  , msg : "Unknown error happened!" };
           }else{
              this.category = "";
              this.getFullCategories();
              this.error = { hasError  : false  , msg : "" };
              $('#create-modal .btn-close').click();
               this.status = "Successfully Created!";
               this.statusError = false;
              this.hideStatusAuto(5000);
           }
        }
      },
      async handleUpdateCategory(e){
            !this.validateInput( this.category) 
           ? this.error = { hasError  : true  , msg : "Category must not be empty!" }
           : this.error = { hasError  : false  , msg : "" };

           if(!this.error.hasError){
              const data = {
                news_category_id : this.id,
                news_category_name : this.category,
              }


              const res = await axios.put(`http://localhost:8080/hexa/api/updatecategory?email=${window.atob(this.userInfo.user_email)}&_token=${window.atob(this.userInfo._token)}` , data);

                if(res.data == 'Duplicate'){
                    this.error = { hasError  : true  , msg : "Category must not be duplicate!" };
                }else if(res.data == 'Failed'){
                    this.error = { hasError  : true  , msg : "Unknown error happened!" };
                }else{
                    this.category = "";
                    this.getFullCategories();
                    this.error = { hasError  : false  , msg : "" };
                    this.status = "Successfully Updated!";
                    this.statusError = false;
                    this.category = "";
                    $('#update-modal').click();
                     this.hideStatusAuto(5000);
                }
           }
      },  
       handleUpdateClick(e){
          let id = parseInt(e.target.parentNode.parentNode.getAttribute("data-category"));
          let category = this.fullCategories.filter(c => c.news_category_id == id)[0];        
          this.category = category.news_category_name;
          this.id = id;

          $("#modal-toggle-btn").click();

      },
      async handleDeleteCategory(e){
         let id = parseInt(e.target.parentNode.parentNode.getAttribute("data-category"));
         let category = this.fullCategories.filter(c => c.news_category_id == id)[0];        
         let canDelete = category.news_count == 0 ?  true : false;

         if(canDelete){
              swal({
                text : `Are you sure to delete , ${category.news_category_name} category?`,
                icon : "warning",
                buttons : ["No","Yes"],
              }).then( async (willDelete) => {
                if(willDelete){

                    const res = await axios.delete(`http://localhost:8080/hexa/api/deletecategory?email=${window.atob(this.userInfo.user_email)}&_token=${window.atob(this.userInfo._token)}&id=${id}`);

                    if(res.data == "Success"){
                      this.status = "Successfully Deleted!";
                      this.statusError = false;
                      this.getFullCategories();
                      this.hideStatusAuto(5000);
                    }else{
                      this.status = "Something went wrong!";
                      this.statusError = true;
                       this.hideStatusAuto(5000);
                    }
                }
              })
              
         }else{
            swal({
              text : `You can't delete ${category.news_category_name} category because of having news under this.`,
              icon : "warning",
              button : "Yes,I got it!"
            })
         }
      },
      validateInput( input ){
        let status = false;
        input == "" || null
        ? status = false
        : status = true
        return status;
      },
      hideStatusAuto( wait ){
        setTimeout(() => {
           this.status = "";
           this.statusError = false;
        },wait)
      },
      ...mapActions(['getCategories','getUserInfo','getFullCategories','removeCategories','removeFullCategories']),
    },
    computed : {
      ...mapGetters(['categories','userInfo','isLogin','fullCategories']),
    },
    mounted(){

      if(document.cookie != ""){
         this.getUserInfo();

         this.removeCategories();
         this.removeFullCategories();

          window.atob(this.userInfo.user_role) == 'admin'
          ?  this.getFullCategories()
          : this.getCategories();

         this.isLoading = false;
      }
    }
}
</script>
