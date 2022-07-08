<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex" >

    <Sidebar/>

    <div id="admin-main" class="w-85">
        <Navbar  :isLogin="isLogin" :userInfo="userInfo" />

       <h1 class="my-5 thm h3 fw-bold">NEWS' COMMENTS</h1>

      <div v-if="cmtsInReporter.length">
          <Table :columns="columns"  :datas="cmtsInReporter">
            <!-- <template v-slot:action>
                <td class="d-flex gap-2 justify-content-center px-3">
                  <router-link to="/admin/news/8/comments" class="btn btn-success btn-sm w-100">Detail{{  }}</router-link>
                </td>
              </template> -->
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
    name : 'NewsCommentsView',
    components : {
        Navbar,
        Sidebar,
        Table
    },
    data(){
      return {
        columns : ["title","commenters_count","comments_count"],
      }
    },
    methods : {
      ...mapActions(['getCmtsInReporter','getUserInfo'])
    },
    computed : {
      ...mapGetters(['cmtsInReporter','userInfo','isLogin']),
    },
    mounted(){
      this.getCmtsInReporter();
       if(document.cookie != ""){
         this.getUserInfo();
      }
    }
}
</script>
