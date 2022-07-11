<template>
  <table id="table" class="table table-bordered w-75  table-striped my-5 mx-auto">
    <thead>
        <tr class="bg-dark">
            <td class="h6 fw-bold thm text-capitalize">id</td>
            <td class="h6 fw-bold thm text-capitalize text-start" v-for="column in columns" :key="column">{{ getFormat(column) }}</td>
            <td v-if="hasAction" class="h6 fw-bold thm">Action</td>
        </tr>
    </thead>

    <tbody>
        <tr v-for="(data,index) in datas" :key="datas[index]" :data-category="data.news_category_id != null ?  data.news_category_id : ''" >
            <td class="text-start">{{ index + 1 }}</td>
            <td v-for="column in columns" :key="column" class="text-start" :class="{'text-capitalize' : column.includes('email') ? false : true}">
                <span v-if="column != 'user_role_name'">{{data[column] }}</span>
                <div v-if="column == 'user_role_name' && roles != null" class="dropdown" :id="'dropdown'+data.user_id">
                    <button class="btn btn-sm btn-primary text-start text-capitalize txt-light fw-bold dropdown-toggle w-100" data-bs-toggle="dropdown" :data-bs-target="'#dropdown'+data.user_id">{{ data.user_role_name }}</button>

                    <ul class="dropdown-menu p-0 m-0">
                        <li v-for="role in roles" class="dropdown-item text-capitalize fw-bold txt-dark" :key="role.id"><span v-if="role.name != data.user_role_name">{{ role.name }}</span></li>
                    </ul>
                </div>
            </td> 
            <slot name="action"></slot>
            <td v-if="data.comments_count" class="d-flex gap-2 justify-content-center px-3">
                <router-link :to="{ path : '/admin/news/'+data.id+'/comments'}" class="btn btn-success btn-sm w-100">Detail</router-link>
            </td>
        </tr>
    </tbody>
  </table>

</template>

<script>
import $ from 'jquery';
import getFormat from '@/composables/getFormat';

export default {
    name : 'Table',
    props : {
        columns : {
            type : Array,
            default : [],
        },
        datas : {
            type : Array,
            default : [],
        },
        roles : {
            type : Array,
            default : null,
        },
        hasAction : {
            type : Boolean,
            default : true,
        }
    },
    data(){
        return {
            table : null,
        }
    },
    setup(){
        const fixTablePosition = () => {
              $("#table_info").css("display","none");
              $("#table_length").css({"transform":"translateX(110%)","margin":"20px 0"});
              $("#table_filter label").addClass("d-flex align-items-center gap-1");
              $("#table_filter label input").addClass("form-control d-inline");
              $("#table_filter").css({"transform":"translateX(-68%)","margin":"20px 0"});
              $("#table_paginate").css("transform","translateX(-70%)");
              $("#table_paginate span").addClass("shadow-sm");
        }

        return { getFormat , fixTablePosition }
    },  
    mounted (){
        this.table = $("#table").DataTable();
        this.fixTablePosition();

        this.$watch(
            () => this.datas,
            () => {
               this.table.destroy();
                setTimeout(() => {
                     this.table = $("#table").DataTable({
                        "lengthMenu": [ 10, 25, 50, 75, 100 ],
                        "pageLength": 10
                    });
                     this.fixTablePosition();
                });
            }
        )
    }
}
</script>

<style scoped>

table:hover{
    cursor:pointer;
}

tbody tr{
    transition:0.5s all;
}

tbody tr:hover{
    background: rgba(0,0,0,0.55);
}
</style>
