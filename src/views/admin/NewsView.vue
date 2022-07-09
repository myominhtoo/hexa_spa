<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex">

    <Sidebar :userInfo="userInfo" :isLogin="isLogin" />

    <div id="admin-main" class="w-85">
        <Navbar :isLogin="isLogin" :userInfo="userInfo" />

        <h1 class="my-5 thm h3 fw-bold">NEWS' INFORMATION</h1>

        <div v-if="wroteNews.length > 0">
             <Table :columns="columns" :datas="wroteNews">
                <template v-slot:action>
                  <td class="d-flex gap-2 justify-content-center">
                    <button class="btn btn-warning btn-sm">Update</button>

                    <button class="btn btn-danger btn-sm">Delete</button>
                  </td>
                </template>
            </Table>
        </div>

        <div v-else>
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
      }
    },
    methods : {
      ...mapActions(['getWroteNews','getUserInfo']),
    },
    computed : {
      ...mapGetters(['wroteNews','userInfo','isLogin']),
    },
    mounted(){
      this.getWroteNews();
       if(document.cookie != ""){
         this.getUserInfo();
      }
    }

}
</script>
