<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex" >

     <Sidebar :userInfo="userInfo" :isLogin="isLogin" />
     
    <div id="admin-main" class="w-85 pb-5">
        <Navbar @update:infos="updateInfo" :userInfo="userInfo" :isLogin="isLogin" />

       <h1 class="my-5 thm h3 fw-bold">NEWS' COMMENTS</h1>


      <p v-if="status != '' && status != null" class="fw-bold w-75 mx-auto text-start"> <span :class="{'text-success' : hasError ? false : true , 'text-danger' : hasError ? true : false }"> {{ status }} </span></p>

      <div v-if="cmtsInNews != null">
          <Table :columns="columns"  :datas="cmtsInNews">
            <template v-slot:action>
                <td class="d-flex gap-2 justify-content-center px-3">
                  <button @click="handleDeleteComment" class="btn btn-danger btn-sm w-100">Delete</button>
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
import axios from 'axios';
import swal from 'sweetalert';
import getUpdateInfo from '@/composables/getUpdateInfo';
import getSetTitle from '@/composables/getSetTitle';

export default {
    name : 'CommentsView',
    components : {
        Navbar,
        Sidebar,
        Table
    },
    data(){
      return {
        isLoading : true,
        status : "",
        hasError : false,
        columns : ["comment","commented_user","commented_date"],
      }
    },
    setup(){
       const { updateInfo } = getUpdateInfo();


        return {updateInfo };
    },
    methods : {
      async handleDeleteComment(e){
        let targetValue  = e.target.parentNode.parentNode.getAttribute("data-comment");
        let commentId = targetValue == "" || isNaN(targetValue) ? "" : parseInt(targetValue);
        let newsId = this.$route.params.newsId;
        newsId = newsId == "" || isNaN(newsId) ? "" : parseInt(newsId);

        if(commentId != "" && newsId ){
            swal({
              text : "Are you sure to delete this comment?",
              icon : "warning",
              buttons : ["No","Yes"]
            }).then(async willDelete => {

              if(willDelete){
                await axios.delete(`http://localhost:8080/hexa/api/news/${newsId}/comments/${commentId}`)
                .then( res => {
                    if(res.status == 200){
                      this.status = "Succesfully Deleted!";
                      this.hasError = false;
                      this.getCmtsInNews({ userId : window.atob(this.userInfo.user_id) , newsId : newsId });
                      this.removeStatusAuto( 3000 );
                    }else{
                      this.status = "Something went wrong!";
                      this.hasError = true;
                      this.removeStatusAuto( 3000 );
                    }
                }).catch(e => {
                  console.log("Error happened in deleting comment!");
                });
              }
            });
        }
      },
      removeStatusAuto( wait ){
        setTimeout(
          () => {
            this.status = "";
            this.hasError = false;
          } , wait );
      },
      ...mapActions(['getCmtsInNews','getUserInfo'])
    },
    computed : {
      ...mapGetters(['cmtsInNews','userInfo','isLogin']),
    },
    mounted(){
      if(document.cookie != ""){
         this.getUserInfo();
         this.getCmtsInNews({ userId : window.atob(this.userInfo.user_id) , newsId : this.$route.params.newsId});
         this.isLoading = false;
      }

      getSetTitle("admin | comments");
    }
}
</script>
