<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex" >

    <Sidebar/>

    <div id="admin-main" class="w-85">
        <Navbar/>

        <h1 class="my-5 thm h3 fw-bold">USERS' INFORMATION</h1>

        <Table :columns="columns" :datas="datas" >
          <template v-slot:action>
            <td class="d-flex gap-2 justify-content-center px-3">
              <button class="btn btn-danger btn-sm w-100">Ban</button>
            </td>
          </template>
        </Table>

    </div>
  </main>
</template>

<script>
import Table from '../../components/admin/Table.vue';
import Sidebar from '../../components/admin/SideBar.vue';
import Navbar from '../../components/admin/Navbar.vue';

export default {
    name : 'UsersView',
    components : {
        Navbar,
        Sidebar,
        Table
    },
    data(){
      return {
        columns : ["name","email"],
        datas : [
          {
            name : "Aung Aung",
            email : "aungaung@gmail.com"
          },
          {
            name : "Mung Mung",
            email : "mungmung@gmail.com"
          },
          {
            name : "Nung Nung",
            email : "nungnung@gmail.com"
          },
        ]
      }
    }
}
</script>
