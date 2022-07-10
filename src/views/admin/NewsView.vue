<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex">

    <Sidebar :userInfo="userInfo" :isLogin="isLogin" />

    <div id="admin-main" class="w-85 pb-5">
        <Navbar :isLogin="isLogin" :userInfo="userInfo" />

        <h1 class="my-5 thm h3 fw-bold">NEWS' INFORMATION</h1>

        <div v-if="wroteNews != null && !isLoading">
             <Table :columns="columns" :datas="wroteNews">
                <template v-slot:action>
                  <td class="d-flex gap-2 justify-content-center">
                    <button class="btn btn-warning btn-sm">Update</button>

                    <button class="btn btn-danger btn-sm txt-light fw-bold">Delete</button>
                  </td>
                </template>
            </Table>
        </div>


         <div v-else-if="allNews != null && !isLoading">
             <Table :columns="columns" :datas="allNews">
                <template v-slot:action>
                  <td class="d-flex gap-2 justify-content-center">
                    <button class="btn btn-warning btn-sm">Update</button>

                    <button class="btn btn-danger btn-sm txt-light fw-bold">Delete</button>
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
      }
    },
    setup(){
      const { encode , decode} = getSecret();

      return { encode ,decode };
    },
    methods : {
      ...mapActions(['getWroteNews','getUserInfo','getAllNewsForAdmin']),
    },
    computed : {
      ...mapGetters(['wroteNews','userInfo','isLogin','allNews']),
    },
    mounted(){
       if(document.cookie != ""){
         this.getUserInfo();

         this.decode(this.userInfo.user_role) == 'admin'
         ? this.getAllNewsForAdmin()
         : this.getWroteNews(this.decode(this.userInfo.user_id));

         this.isLoading = false;

      }
    }

}
</script>
