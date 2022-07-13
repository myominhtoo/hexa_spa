<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex" >

     <Sidebar :userInfo="userInfo" :isLogin="isLogin" />

    <div id="admin-main" class="w-85 pb-5">
        <Navbar @update:infos="updateInfo" :userInfo="userInfo" :isLogin="isLogin" />

       <h1 class="my-5 thm h3 fw-bold">NEWS' COMMENTS</h1>
      <div v-if="cmtsInReporter != null && !isLoading">
          <Table :columns="columns"  :datas="cmtsInReporter">
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
import { mapActions, mapGetters , useStore } from 'vuex';
import getSecret from '@/composables/getSecret';
import getUpdateInfo from '@/composables/getUpdateInfo';

export default {
    name : 'NewsCommentsView',
    components : {
        Navbar,
        Sidebar,
        Table
    },
    data(){
      return {
        columns : ["title","commenters_count","comments_count"],
        isLoading : true,
      }
    },
    setup(){
      const { decode } = getSecret();
      const { updateInfo } = getUpdateInfo();

      return { decode , updateInfo };
    },
    methods : {
      ...mapActions(['getCmtsInReporter','getUserInfo'])
    },
    computed : {
      ...mapGetters(['cmtsInReporter','userInfo','isLogin']),
    },
    mounted(){
       if(document.cookie != ""){
         this.getUserInfo();

         this.getCmtsInReporter(this.decode(this.userInfo.user_id));

         this.isLoading = false;
      }
    }
}
</script>
