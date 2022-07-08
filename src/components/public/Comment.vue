<template>
    <div v-show="data != null" id="comment" class="w-100 shadow-sm p-2 px-3 my-2" >
        <div id="comment-control">
            <div class="dropdown">
                <i v-if="isLogin && data != null && data.user_id == decode(userInfo.user_id) && data.user_name == decode(userInfo.user_name)" class="fa-solid fa-ellipsis-vertical txt-dark p-3" data-bs-target="dropdown" data-bs-toggle="dropdown"></i>

                <ul class="dropdown-menu p-0 m-0" style="transform:translateX(-100%) !important;">
                    <li class="dropdown-item w-100" data-bs-toggle="modal" :data-bs-target="'#modal-'+data.comment_id" >Edit</li>
                    <li @click="$emit('delete',data.comment_id)" class="dropdown-item w-100">Delete</li>
                </ul>
            </div>
        </div>
        <div id="comment-info" class="d-flex gap-2 align-items-center">
            <img src="http://localhost:8080/img/profile.png" alt="image" style="width:40px;height:40px;border-radius:100%;"/>
            <div id="person-info" class="d-flex flex-column align-items-start ">
                <span id="name" class="fw-bold thm text-capitalize">{{ data.user_name }}</span>
                <span id="date" class="fw-bold thm">{{ data.commented_date }}</span>
            </div>
        </div>
        <div id="comment-content">
            <p class="txt-dark text-start">{{ data.comments }}</p>
        </div>
    </div>

    <div class="modal fade" :id="'modal-'+data.comment_id">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content d-flex justify-content-between ">
                <header class="modal-header">
                    <i class="btn btn-close" data-bs-dismiss="modal" :data-bs-target="'#modal-'+data.comment_id"></i>
                </header>
                <form @submit.prevent="handleUpdateSubmit(data.comment_id)" class="modal-body">
                    <div class="form-group my-2 text-start">
                        <label  class="my-1 form-label fw-bold txt-dark">Comment</label>
                        <input v-model="comment" type="text" name="comment" class="form-control">
                        <span v-show="error.hasError" class="text-danger my-2 " id="error">{{ error.msg }}</span>
                    </div>
                    <div class="form-group my-2 d-flex justify-content-end gap-2">
                        <button type="submit" class="btn btn-warning btn-sm my-2  txt-dark fw-bold">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import getSecret from '@/composables/getSecret.js';
import { reactive, ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import $ from 'jquery'; 
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
    name : 'Comment',
    props : {
        data : {
            type : Object,
            default : null,
        },
        userInfo :"",
        isLogin : {
            type : Boolean,
            default : false,
        },
    },
    emits : ["delete","update"],
    setup(props,context){
        const { encode , decode } = getSecret();

        const route = useRoute();
        const store = useStore();

        const comment = ref('');
        var error = reactive({
            hasError : false,
            msg : "",
        })

        onMounted(() => {
            comment.value = props.data.comments;
        })

        const handleUpdateSubmit = async (target) => {
            if(comment.value == ""){
                error.hasError = true;
                error.msg = "Comment must not be empty!"
            }else{
                 error.hasError = false;
                 error.msg = "";
            }

           
           if(!error.hasError && comment.value != ""){
                let newsId = route.params.id;
                const data = {
                    comments : comment.value,
                    comment_id : target
                }

                const res = await axios.put(`http://localhost:8080/hexa/api/news/${newsId}/comments/${target}` , data );

                if(res.data == "Success"){
                    context.emit('update',newsId);
                    $(`#comments #modal-${target} .btn-close`).click();
                    
                }
            }
        }

        return { encode , decode , comment  ,  error , handleUpdateSubmit };
    },
}
</script>