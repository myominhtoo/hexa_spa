<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex" >

    <Sidebar :userInfo="userInfo" :isLogin="isLogin" />

    <div id="admin-main" class="w-85 pb-5">
        <Navbar :isLogin="isLogin" :userInfo="userInfo" />

        <h1 class="my-5 thm h3 fw-bold">USERS' INFORMATION</h1>

       <div v-if="users.length">
          <Table :columns="columns" :datas="users"  :roles="roles" >
              <template v-slot:action>
                <td class="d-flex gap-2 justify-content-center px-3">
                  <button class="btn btn-danger btn-sm w-100 txt-light fw-bold">Ban</button>
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
import Table from '../../components/admin/Table.vue';
import Sidebar from '../../components/admin/SideBar.vue';
import Navbar from '../../components/admin/Navbar.vue';
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default {
    name : 'UsersView',
    components : {
        Navbar,
        Sidebar,
        Table
    },
    data(){
      return {
        columns : ['user_name','user_email','user_role_name'],
        roles : null,
      }
    },
    methods : {
      async getRoles(){
        const res = await axios.get('http://localhost:8080/hexa/api/roles');

        this.roles = res.data;
      },
      ...mapActions(['getUsers','getUserInfo']),
    },
    computed : {
      ...mapGetters(['users','userInfo','isLogin']),
    },
    mounted(){
      this.getUsers();
      this.getRoles();
       if(document.cookie != ""){
         this.getUserInfo();
      }
    }
}
</script>
