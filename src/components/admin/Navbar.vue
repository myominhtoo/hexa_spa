<template>
    <header  id="admin-navbar" class="w-100 bg-snow shadow-thm sticky-top navbar navbar-expand">
        <div class="container px-5">
            <router-link  to="/admin" class="h3 fw-bold txt-dark navbar-brand">HEXA</router-link>

            <div class="navbar-nav d-flex align-items-center gap-3">
                <li class="nav-item fw-bold txt-dark" v-if="isLogin && userInfo != ''"><span class="mx-1 txt-dark text-capitalize">{{ decode(userInfo.user_name) }}</span><span class="mx-1 p-2 thm shadow-sm text-capitalize">{{ decode(userInfo.user_role) }}</span></li>
                <li @click="handleLogout(userInfo)" class="nav-item p-2 fw-bold shadow-sm text-danger">Logout</li>
            </div>
        </div>
    </header>
</template>

<script>
import getSecret from '@/composables/getSecret.js';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import getLogout from '@/composables/getLogout.js';

export default {
    name : 'Navbar',
    props : {
        isLogin : {
            type : Boolean,
            default : false,
        },
        userInfo : "",
    },
    setup(props){
        const { encode , decode } = getSecret();

        const store = useStore();
        const router = useRouter();

        const { handleLogout } = getLogout();

       
        return { encode , decode , handleLogout };
    },

}
</script>