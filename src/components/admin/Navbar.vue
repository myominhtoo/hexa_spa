<template>
    <header  id="admin-navbar" class="w-100 bg-snow shadow-thm sticky-top navbar navbar-expand">
        <div class="container px-5">
            <router-link  to="/admin" class="h3 fw-bold txt-dark navbar-brand">HEXA</router-link>

            <div class="navbar-nav d-flex align-items-center gap-3">
                <span id="toggle-edit-modal" class="d-none" data-bs-toggle="modal" data-bs-target="#edit-modal"></span>
                <li @click="handleNameClick('')" class="nav-item fw-bold txt-dark " v-if="isLogin && userInfo != ''"><span class="mx-1 txt-dark text-capitalize">{{ decode(userInfo.user_name) }}</span><span class="mx-1 p-2 text-primary shadow-sm " >{{ decode(userInfo.user_role) }}</span></li>
                <li @click="handleLogout(userInfo)" class="nav-item p-2 fw-bold shadow-sm text-danger">Logout</li>
            </div>
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
import getEditUserInfo from '@/composables/getEditUserInfo';

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

        const {  decode } = getSecret();

        const { handleLogout } = getLogout();
        const { handleEditInfoSubmit , handleNameClick , user_name , user_email , user_password , errors  } = getEditUserInfo( emit );

       
        return { decode , handleLogout ,handleEditInfoSubmit , handleNameClick , user_name , user_email , user_password , errors };
    },

}
</script>