<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex ">

    <Sidebar :userInfo="userInfo" :isLogin="isLogin" />

    <div id="admin-main" class="w-85 pb-5">
        <Navbar @update:infos="updateInfo" :userInfo="userInfo" :isLogin="isLogin" />

        <Welcome :userInfo="userInfo" :isLogin="isLogin"/>

        <div class="container row justify-content-center gap-3 mx-auto">
           <Box :info="{name : 'Reporters' , icon : 'fa-solid fa-bullhorn txt-light h5' , count : '10'}"/>
           <Box :info="{name : 'Users' , icon : 'fa-solid fa-users txt-light h5' , count : '10'}"/>
           <Box :info="{name : 'Total News' , icon : 'fa-solid fa-newspaper txt-light h5' , count : '10'}"/>
        </div>

        <AdminChart />

    </div>
  </main>
</template>

<script>
import Sidebar from '../../components/admin/SideBar.vue';
import Navbar from '../../components/admin/Navbar.vue';
import Welcome from '../../components/admin/Welcome.vue';
import Box from '../../components/admin/Box.vue';
import { mapActions, mapGetters, useStore } from 'vuex';
import AdminChart from '@/components/admin/AdminChart.vue';
import getUpdateInfo from '@/composables/getUpdateInfo.js'


export default {
    name : 'AdminHomeView',
    components : {
        Navbar,
        Sidebar,
        Welcome,
        Box,
        AdminChart
    },
    data(){
      return {
        watcher : null,
      }
    },
    setup(){
      const { updateInfo } = getUpdateInfo();

      return { updateInfo }
      
    },
    methods : {
      ...mapActions(['getUserInfo']),
    },
    computed :  {
      ...mapGetters(['userInfo','isLogin']),
    },
    mounted(){
      if(document.cookie != ""){
         this.getUserInfo();
      }
    }
}
</script>
