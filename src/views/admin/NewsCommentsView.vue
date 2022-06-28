<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex" >

    <Sidebar/>

    <div id="admin-main" class="w-85">
        <Navbar/>

       <h1 class="my-5 thm h3 fw-bold">NEWS' COMMENTS</h1>

      <Table :columns="columns"  :datas="datas">
         <template v-slot:action>
            <td class="d-flex gap-2 justify-content-center px-3">
              <button class="btn btn-success btn-sm w-100">Detail</button>
            </td>
          </template>
      </Table>

    </div>
  </main>
</template>

<script>
import Sidebar from '../../components/admin/SideBar.vue';
import Navbar from '../../components/admin/Navbar.vue';
import Table from '../../components/admin/Table.vue';

export default {
    name : 'NewsCommentsView',
    components : {
        Navbar,
        Sidebar,
        Table
    },
    data(){
      return {
        columns : ["news_title","commenter_count","comment_count"],
        datas : [
          {
            news_title : "Future of Vuejs",
            commenter_count : 10 , 
            comment_count : 10,
          },
           {
            news_title : "Future of Vuejs",
            commenter_count : 10 , 
            comment_count : 10,
          },
           {
            news_title : "Future of Vuejs",
            commenter_count : 10 , 
            comment_count : 10,
          }
        ]
      }
    }
}
</script>
