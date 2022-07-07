<template>
    <div v-show="data != null" id="comment" class="w-100 shadow-sm p-2 px-3 my-2" >
        <div id="comment-control">
            <div class="dropdown">
                <i v-if="isLogin && data != null && data.user_id == decode(userInfo.user_id) && data.user_name == decode(userInfo.user_name)" class="fa-solid fa-ellipsis-vertical txt-dark" data-bs-target="dropdown" data-bs-toggle="dropdown"></i>

                <ul class="dropdown-menu p-0 m-0" style="transform:translateX(-100%) !important;">
                    <li class="dropdown-item">Edit</li>
                    <li class="dropdown-item">Delete</li>
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import getSecret from '@/composables/getSecret.js';

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
        }
    },

    setup(){
        const { encode , decode } = getSecret();

        return { encode , decode };
    }
}
</script>