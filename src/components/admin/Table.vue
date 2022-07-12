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
        <tr v-for="(data,index) in datas" :key="datas[index]" :data-category="data.news_category_id != null ?  data.news_category_id : ''" :data-comment="data.comment_id != null ? data.comment_id : ''"  :data-news="data.news_id != null ? data.news_id : ''" >
            <td class="text-start">{{ index + 1 }}</td>
            <td v-for="column in columns" :key="column" class="text-start" :class="{'text-capitalize' : column.includes('email') ? false : true}">
                <span v-if="column != 'user_role_name' && column != 'user_status'">{{ data[column] }}</span>
                <p v-if="column == 'user_status'" @click="handleChangeStatus( data.user_id ,data[column])" :class="{'btn btn-sm btn-success fw-bold txt-light' : data[column] == 0 ? true : false , 'btn btn-sm btn-danger fw-bold txt-light' : data[column] == 0 ? false : true }"><span v-if="data[column] == 0">Active</span><span v-if="data[column] == 1">Unactive</span></p>
                <div v-if="column == 'user_role_name' && roles != null" class="dropdown p-0" :id="'dropdown'+data.user_id">
                    <button class="btn btn-sm btn-success  text-start text-capitalize txt-light fw-bold dropdown-toggle w-100 m-0" data-bs-toggle="dropdown" :data-bs-target="'#dropdown'+data.user_id">{{ data.user_role_name }}</button>

                    <ul class="dropdown-menu p-0 m-0">
                        <li  v-for="role in roles" class="dropdown-item text-capitalize fw-bold txt-dark" @click="handleRoleChange( data.user_id ,role.id)" :key="role.id"><span v-if="role.name != data.user_role_name">{{ role.name }}</span></li>
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
import getSecret from '@/composables/getSecret';
import getCookie from '@/router/helper/getCookie';
import axios from 'axios';

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
    emits : ['re:fetch','show:status'],
    data(){
        return {
            table : null,
        }
    },
    setup( props , { emit }){

        const { decode } = getSecret();
        const userInfo = getCookie();

        const fixTablePosition = () => {
              $("#table_info").css("display","none");
              $("#table_length").css({"transform":"translateX(110%)","margin":"20px 0"});
              $("#table_filter label").addClass("d-flex align-items-center gap-1");
              $("#table_filter label input").addClass("form-control d-inline");
              $("#table_filter").css({"transform":"translateX(-68%)","margin":"20px 0"});
              $("#table_paginate").css("transform","translateX(-70%)");
              $("#table_paginate span").addClass("shadow-sm");
              
        }

        const handleRoleChange = ( targetId ,  to ) => {
            swal({
                text : "Are you sure to change role for this user ? ",
                icon : "warning",
                buttons : ["No","Yes"],
            }).then( yes => {
                if(yes){
                    swal({
                        button : "Comfirm",
                        content : {
                            element : "input",
                            attributes : {
                                placeholder : "Type your password to comfirm",
                                autofocus : true ,
                                type : "password",
                            }
                        }
                    }).then( async pwd => {
                        if(pwd == decode(decode(userInfo.code))){
                            const res = await axios.put(`http://localhost:8080/hexa/api/users/${targetId}/changerole?email=${decode(userInfo.user_email)}&_token=${decode(userInfo._token)}&roleId=${to}`);

                            if(res.status == 200){
                                emit('re:fetch');
                                emit('show:status',{
                                    status : "Successfully Changed!",
                                    hasError : false,
                                });
                            }else{
                                emit('show:status',{
                                    status : "Something went wrong!",
                                    hasError : true,
                                });
                            }
                             
                        }else{
                            emit('show:status',{
                                status : "Wrong Password , Unable to change!",
                                hasError : true,
                            });
                        }
                    })
                }
            })
        }

        const handleChangeStatus = ( targetId ,  statusNow ) => {
            let status = statusNow == 0 ? 1 : 0;
            let msg = status == 0 ? 'Un-block' : 'Block' ; 

             swal({
                text : `Are you sure to ${msg} this user ? `,
                icon : "warning",
                buttons : ["No","Yes"],
            }).then( yes => {
                if(yes){
                    swal({
                        button : "Comfirm",
                        content : {
                            element : "input",
                            attributes : {
                                placeholder : "Type your password to comfirm",
                                autofocus : true ,
                                type : "password",
                            }
                        }
                    }).then( async pwd => {
                        if(pwd == decode(decode(userInfo.code))){
                           const res = await axios.put(`http://localhost:8080/hexa/api/users/${targetId}/changestatus?email=${decode(userInfo.user_email)}&_token=${decode(userInfo._token)}&status=${status}`);

                            if(res.status == 200){
                                 emit('re:fetch');
                                 emit('show:status',{
                                        status : "Successfully Changed!",
                                        hasError : false,
                                 });
                            }else{
                                 emit('show:status',{
                                    status : "Something went wrong!",
                                    hasError : true,
                                });
                            }
                        }else{
                            emit('show:status',{
                                status : "Wrong Password , Unable to change!",
                                hasError : true,
                            });
                        }
                    })
                }
            })
           
        }

        return { getFormat , fixTablePosition , handleRoleChange , handleChangeStatus }
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
