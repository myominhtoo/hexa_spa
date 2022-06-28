<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex">

    <Sidebar/>

    <div id="admin-main" class="w-85">
        <Navbar/>

         <h1 class="my-5 thm h3 fw-bold">CATEGORIES' INFORMATION</h1>

        <div v-if="categories.length > 0">
           <Table :columns="columns" :datas="categories">
              <template v-slot:action>
                  <td class="d-flex gap-2 justify-content-center px-3">
                    <button class="btn btn-warning btn-sm">Update</button>
                    <button class="btn btn-danger btn-sm ">Delete</button>
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
    name : 'CategoriesView',
    components : {
        Navbar,
        Sidebar,
        Table
    },
    data(){
      return {
        columns : ["news_category_name"],
      }
    },
    methods : {
      ...mapActions(['getCategories'])
    },
    computed : {
      ...mapGetters(['categories']),
    },
    mounted(){
      this.getCategories();

      // console.log(this.categories)
    }
}
</script>
