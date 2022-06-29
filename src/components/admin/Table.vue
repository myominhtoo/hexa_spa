<template>

  <table id="table" class="table table-bordered w-75  table-striped my-5 mx-auto">
    <thead>
        <tr>
            <td class="h6 fw-bold txt-dark text-capitalize">id</td>
            <td class="h6 fw-bold txt-dark text-capitalize" v-for="column in columns" :key="column">{{ column.replace("_"," ") }}</td>
            <td class="h6 fw-bold txt-dark">Action</td>
        </tr>
    </thead>

    <tbody>
        <tr v-for="(data,index) in datas" :key="index">
            <td class="text-start">{{ index + 1 }}</td>
            <td v-for="column in columns" :key="column" class="text-start text-capitalize">{{data[column] }}</td> 
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
        }
    },
    mounted (){
        $("#table").DataTable();

        $("#table_info").css("display","none");
        $("#table_length").css("transform","translateX(50%)");
        $("#table_filter").css("transform","translateX(-50%)");
        $("#table_paginate").css("transform","translateX(-50%)");
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
