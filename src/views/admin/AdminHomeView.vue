<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex">

    <Sidebar/>

    <div id="admin-main" class="w-85">
        <Navbar :userInfo="userInfo" :isLogin="isLogin" />

        <Welcome/>

        <div class="container row justify-content-center gap-2">
           <Box :info="{name : 'Reporters' , icon : 'fa-solid fa-bullhorn txt-light h5' , count : '10'}"/>
           <Box :info="{name : 'Users' , icon : 'fa-solid fa-users txt-light h5' , count : '10'}"/>
           <Box :info="{name : 'Today News' , icon : 'fa-solid fa-newspaper txt-light h5' , count : '10'}"/>
        </div>

    </div>
  </main>
</template>

<script>
import Sidebar from '../../components/admin/SideBar.vue';
import Navbar from '../../components/admin/Navbar.vue';
import Welcome from '../../components/admin/Welcome.vue';
import Box from '../../components/admin/Box.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name : 'AdminHomeView',
    components : {
        Navbar,
        Sidebar,
        Welcome,
        Box
    },
    methods : {
      ...mapActions(['getUserInfo']),
    },
    computed :  {
      ...mapGetters(['userInfo','isLogin']),
    },
    mounted(){
      this.getUserInfo();

    }
}
</script>
