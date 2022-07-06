<template>

    <header id="public-navbar" class="w-100 navbar navbar-expand px-2 shadow-sm sticky-top bg-snow ">
       <div class="container">
             <h3 class="h3 navbar-brand thm fw-bold">
                HEXA
            </h3>

            <ul class="navbar-nav d-flex align-items-center gap-4">
                <li class="nav-item fw-bold thm"><router-link to="/" class="text-decoration-none thm">Home</router-link></li>
                <li class="nav-item fw-bold txt-dark" v-if="isLogin && userInfo != ''">{{ userInfo.user_name }}</li>
                <li class="nav-item shadow-sm text-success p-1 fw-bold" v-show="!isLogin"><router-link class="text-decoration-none text-success" :to="{name : 'login'}">Sign In</router-link></li>
                <li class="nav-item shadow-sm text-primary p-1 fw-bold" v-show="!isLogin"><router-link class="text-decoration-none text-primary" :to="{ name : 'register'}">Sign Up</router-link></li>
                <li class="nav-item shadow-sm text-danger p-1 fw-bold" v-show="isLogin">Logout</li>
                <li class="nav-item h6 fw-bold txt-dark p-0 mx-2"><router-link to="/news?search=''"><i class="fa-solid fa-magnifying-glass txt-dark"></i></router-link></li>
            </ul>
       </div>
    </header>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name : 'Navbar',
    methods : {
        ...mapActions(['getUserInfo']),
    },
    computed : {
        ...mapGetters(['userInfo','isLogin']),
    },
    mounted(){
        this.getUserInfo();
    }
}
</script>