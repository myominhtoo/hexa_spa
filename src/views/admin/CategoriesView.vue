<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex">

     <Sidebar :userInfo="userInfo" :isLogin="isLogin" />

    <div id="admin-main" class="w-85 pb-5">
        <Navbar :userInfo="userInfo" :isLogin="isLogin"/>

         <h1 class="my-5 thm h3 fw-bold">CATEGORIES' INFORMATION</h1>

        <div v-if="categories != null && !isLoading ">
           <Table :columns="columns" :datas="categories" :hasAction="false">
              <!-- <template v-slot:action>
                  <td class="d-flex gap-2 justify-content-start px-3">
                    <button class="btn btn-warning btn-sm">Update</button>
                    <button class="btn btn-danger btn-sm ">Delete</button>
                  </td>
              </template> -->
          </Table>
        </div>

         <div v-if="fullCategories != null && !isLoading">
           <Table :columns="adminColumns" :datas="fullCategories">
              <template v-slot:action>
                  <td class="d-flex gap-2 justify-content-start px-3">
                    <button class="btn btn-warning btn-sm">Update</button>
                    <button class="btn btn-danger btn-sm ">Delete</button>
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

export default {
    name : 'CategoriesView',
    components : {
        Navbar,
        Sidebar,
        Table
    },
    data(){
      return {
        columns :['news_category_name'],
        isLoading : true,
        adminColumns : ['news_category_name','news_count']
      }
    },
    methods : {
      ...mapActions(['getCategories','getUserInfo','getFullCategories','removeCategories']),
    },
    computed : {
      ...mapGetters(['categories','userInfo','isLogin','fullCategories']),
    },
    mounted(){

      if(document.cookie != ""){
         this.getUserInfo();

         this.removeCategories();

          window.atob(this.userInfo.user_role) == 'admin'
          ?  this.getFullCategories()
          : this.getCategories();

         this.isLoading = false;
      }
    }
}
</script>
