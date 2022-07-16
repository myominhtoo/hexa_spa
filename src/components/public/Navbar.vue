<template>

    <header id="public-navbar" class="w-100 navbar navbar-expand px-2 shadow-sm sticky-top bg-snow ">
       <div class="container">
             <h3 class="h3 navbar-brand thm fw-bold">
                HEXA
            </h3>

            <ul class="navbar-nav d-flex align-items-center gap-4">
                <li class="nav-item fw-bold thm"><router-link to="/" class="text-decoration-none thm">Home</router-link></li>
                <span id="toggle-edit-modal" class="d-none p-2" data-bs-toggle="modal" data-bs-target="#edit-modal"></span>
                <li @click="handleNameClick(decode(userInfo.user_role))" class="nav-item fw-bold txt-dark text-capitalize" id="bulb" v-if="isLogin && userInfo != ''">{{ decode(userInfo.user_name )}}</li>
                <li class="nav-item shadow-sm text-success p-1 fw-bold" id="bulb" v-show="!isLogin"><router-link class="text-decoration-none text-success" :to="{name : 'login'}">Sign In</router-link></li>
                <li class="nav-item shadow-sm text-primary p-1 fw-bold" id="bulb" v-show="!isLogin"><router-link class="text-decoration-none text-primary" :to="{ name : 'register'}">Sign Up</router-link></li>
                <li @click="handleLogout(userInfo)" class="nav-item shadow-sm text-danger p-1 fw-bold" id="bulb" v-show="isLogin">Logout</li>
                <li class="nav-item h6 fw-bold txt-dark p-0 mx-2"><router-link to="/news?search=''"><i class="fa-solid fa-magnifying-glass txt-dark"></i></router-link></li>
            </ul>
       </div>
    </header>

     <Modal id="edit-modal" title="Edit Infos">
        <template v-slot:body>
            <form @submit.prevent="handleEditInfoSubmit" action="" class="w-100 text-start">
                <div class="form-group my-2">
                    <label for="" class="form-label fw-bold">Username</label>
                    <input v-model="user_name" type="text" class="form-control" placeholder="Enter username">
                    <span v-if="errors.user_name.hasError && errors.user_name.hasError" id="error" class="fw-bold text-danger">{{ errors.user_name.msg }}</span>
                </div>

                <div class="form-group my-2">
                    <label for="" class="form-label fw-bold">Email Address</label>
                    <input v-model="user_email" type="email" class="form-control" placeholder="Enter email address">
                    <span v-if="errors.user_email.hasError && errors.user_email.hasError" id="error" class="fw-bold text-danger">{{ errors.user_email.msg }}</span>
                </div>

                <div class="form-group my-2">
                    <label for="" class="form-label fw-bold">Password</label>
                    <input v-model="user_password" type="password" class="form-control" placeholder="Enter password">
                    <span v-if="errors.user_password.hasError && errors.user_password.hasError" id="error" class="fw-bold text-danger">{{ errors.user_password.msg }}</span>
                </div>

                <div class="form-group text-end my-2">
                    <button type="submit" class="btn btn-danger fw-bold txt-light btn-sm">UPDATE</button>
                </div>
            </form>
        </template>
    </Modal>

</template>

<script>
import getSecret from '@/composables/getSecret.js';
import getLogout from '@/composables/getLogout.js';
import Modal from '@/components/common/Modal.vue';
import getEditUserInfo from '@/composables/getEditUserInfo.js';

export default {
    name : 'Navbar',
    props : {
        isLogin : {
            type : Boolean,
            default : false,
        },
        userInfo : "",
    },
    emits : ["update:infos"],
    components : {
        Modal
    },
    setup(props , { emit }){
        const { encode , decode } = getSecret();

        const { handleLogout } = getLogout();
        const { handleEditInfoSubmit , handleNameClick , user_name , user_email , user_password , errors  } = getEditUserInfo( emit );

       
        return { encode , decode , handleLogout ,handleEditInfoSubmit , handleNameClick , user_name , user_email , user_password , errors };
    },

}
</script>