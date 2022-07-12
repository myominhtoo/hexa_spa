<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex">

    <Sidebar :userInfo="userInfo" :isLogin="isLogin" />

    <div id="admin-main" class="w-85 pb-5">
        <Navbar :isLogin="isLogin" :userInfo="userInfo" />

        <h1 class="my-5 thm h3 fw-bold">NEWS' INFORMATION</h1>

        <p v-if="$route.query.status != undefined || status != ''" id="status" class="fw-bold text-success fw-bold w-75 mx-auto">{{ $route.query.status }} <span :class="{'text-danger' : hasError ? true : false}">{{ status }}</span></p>

        <div v-if="wroteNews != null && !isLoading">
             <Table :columns="columns" :datas="wroteNews">
                <template v-slot:action>
                  <td class="d-flex gap-2 justify-content-center">
                    <button @click="handleNewsUpdateClick" class="btn btn-warning btn-sm txt-dark fw-bold">Update</button>

                    <button @click="handleNewsDelete" class="btn btn-danger btn-sm txt-light fw-bold">Delete</button>
                  </td>
                </template>
            </Table>
        </div>


         <div v-else-if="allNews != null && !isLoading">
             <Table :columns="columns" :datas="allNews">
                <template v-slot:action>
                  <td class="d-flex gap-2 justify-content-center">
                    <button @click="handleNewsUpdateClick"  class="btn btn-warning btn-sm">Update</button>

                    <button @click="handleNewsDelete" class="btn btn-danger btn-sm txt-light fw-bold">Delete</button>
                  </td>
                </template>
            </Table>
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
import getSecret from '@/composables/getSecret';
import axios from 'axios';

export default {
    name : 'NewsView',
    components : {
        Navbar,
        Sidebar,
        Table
    },
    data(){
      return {
        columns : ["news_name","news_category_name","creator_name","created_date"],
        isLoading : true,
        status : "",
        hasError : false,
      }
    },
    setup(){
      const { encode , decode} = getSecret();

      return { encode ,decode };
    },
    methods : {
      handleNewsUpdateClick( e ){
        let newsId = e.target.parentNode.parentNode.getAttribute("data-news");
        newsId = newsId == "" || isNaN(newsId) ? "" : parseInt(newsId);

        if(newsId != ""){
          this.$router.push({ path : `/admin/news/${newsId}/update` });
        }
      }, 
      async handleNewsDelete( e ){
        let newsId = e.target.parentNode.parentNode.getAttribute("data-news");
        newsId = newsId == "" || isNaN(newsId) ? "" : parseInt(newsId);

       if(newsId != ''){
          swal({
            text : "Are you sure to delete this news?",
            icon : "warning",
            buttons : ["No","Yes"],
          }).then( yes => {
             if(yes){
              swal({
                button : "Confirm",
                content : {
                  element : "input",
                  attributes : {
                    placeholder : "Type your password to confirm",
                    type : "password",
                  }
                }
              }).then( async pwd => {

                 if(pwd == this.decode(this.decode(this.userInfo.code))){

                    const res = await axios.delete(`http://localhost:8080/hexa/api/news/${newsId}?email=${this.decode(this.userInfo.user_email)}&_token=${this.decode(this.userInfo._token)}`);
          
                    if(res.status == 200){
                        this.status = "Successfully Deleted!";
                        this.hasError = false;
                        this.handleFetchNews();
                        this.removeStatusAuto( 3000 );
                    }else{
                        this.status = "Something Went Wrong!";
                        this.hasError = true;
                        this.removeStatusAuto( 3000 );
                    }

                 }else{
                    this.status = "Wrong Password , Unable to delete!";
                    this.hasError = true;
                    this.removeStatusAuto( 3000 );
                 }

              })
             }
          });

       }
      },
      handleFetchNews(){
         this.decode(this.userInfo.user_role) == 'admin'
         ? this.getAllNewsForAdmin()
         : this.getWroteNews(this.decode(this.userInfo.user_id));
      },
      removeStatusAuto( wait ){
        setTimeout(() => {
          this.status = "";
          this.hasError = false;
        }, wait )
      },
      ...mapActions(['getWroteNews','getUserInfo','getAllNewsForAdmin']),
    },
    computed : {
      ...mapGetters(['wroteNews','userInfo','isLogin','allNews']),
    },
    mounted(){
       if(document.cookie != ""){
         this.getUserInfo();
         this.handleFetchNews();
         this.isLoading = false;

      }
    }

}
</script>
