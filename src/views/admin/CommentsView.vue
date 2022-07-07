<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex" >

    <Sidebar/>

    <div id="admin-main" class="w-85">
        <Navbar :isLogin="isLogin" :userInfo="userInfo" />

       <h1 class="my-5 thm h3 fw-bold">NEWS' COMMENTS</h1>

      <div v-if="cmtsInNews.length">
          <Table :columns="columns"  :datas="cmtsInNews">
            <template v-slot:action>
                <td class="d-flex gap-2 justify-content-center px-3">
                  <button class="btn btn-danger btn-sm w-100">Delete</button>
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
    name : 'CommentsView',
    components : {
        Navbar,
        Sidebar,
        Table
    },
    data(){
      return {
        columns : ["comment","commented_user","commented_date"],
      }
    },
    methods : {
      ...mapActions(['getCmtsInNews','getUserInfo'])
    },
    computed : {
      ...mapGetters(['cmtsInNews','userInfo','isLogin']),
    },
    mounted(){
      this.getUserinfo();
      this.getCmtsInNews({ userId : 17 , newsId : this.$route.params.newsId});
    }
}
</script>
