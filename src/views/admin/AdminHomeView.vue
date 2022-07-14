<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex ">

    <Sidebar :userInfo="userInfo" :isLogin="isLogin" />

    <div id="admin-main" class="w-85 pb-5">
        <Navbar @update:infos="updateInfo" :userInfo="userInfo" :isLogin="isLogin" />

        <Welcome :userInfo="userInfo" :isLogin="isLogin"/>

        <div class="container row justify-content-center gap-3 mx-auto">
           <Box :info="{name : 'Reporters' , icon : 'fa-solid fa-bullhorn txt-light h5' , count : reporter_count }"/>
           <Box :info="{name : 'Users' , icon : 'fa-solid fa-users txt-light h5' ,count : user_count }"/>
           <Box :info="{name : 'Total News' , icon : 'fa-solid fa-newspaper txt-light h5' , count :news_count }"/>
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
import { mapActions, mapGetters } from 'vuex';
import AdminChart from '@/components/admin/AdminChart.vue';
import getUpdateInfo from '@/composables/getUpdateInfo.js'
import axios from 'axios';
import $ from 'jquery';

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
        count : null,
        reporter_count : 0,
        news_count : 0,
        user_count : 0,
        animateDone : "",
      }
    },
    setup(){
      const { updateInfo } = getUpdateInfo();

      return { updateInfo }
      
    },
    methods : {
      async getCounts(){
        const res = await axios.get('http://localhost:8080/hexa/api/counts');
        this.count = res.data;
        this.countAnimate();
      },
      animate( target , realVal ){
        if(!this.animateDone){
            let interval = setInterval(() => {
                if(this[target] == realVal ){
                  clearInterval(interval);
                }else{
                  this[target]++;
                }
            } , 10 )
        }else{
          this[target] = realVal;
        }
      },
      countAnimate(){
         if(this.count != null ){
           let keys = Object.keys(this.count);
           this.animate( keys[0] , this.count[keys[0]] )
           this.animate( keys[1] , this.count[keys[1]] )
           this.animate( keys[2] , this.count[keys[2]] )

           localStorage.setItem("animateDone" , true )
         }
      },
      ...mapActions(['getUserInfo']),
    },
    computed :  {
      ...mapGetters(['userInfo','isLogin']),
    },
    created(){
      this.animateDone = localStorage.getItem("animateDone") == null ? false : true;
    },
    mounted(){
      if(document.cookie != ""){
         this.getUserInfo();
         this.getCounts();

         console.log(this.animateDone)
      }
    }
}
</script>
