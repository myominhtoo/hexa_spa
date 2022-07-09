<template>
    <main v-if="show" class="container row my-5 mx-auto d-flex justify-content-center">
        <div class="d-flex align-items-center gap-1 col-sm-12 col-md-10 col-xl-8 ">
            <input v-model="search" @input="debounceSearch" type="text" class="form-control" placeholder="Search you want">
            <button v-if="search != ''" class="btn txt-dark  p-2 px-3" @click="handleClear"><i class="fa-solid fa-circle-xmark " style="font-size:20px;"></i></button>
        </div>
    </main>

</template>

<script>
export default {
    name : 'Search',
    props : {
        show : {
            type : Boolean,
            default : false,
        },
    },
    emits : ['search:news'],
    data(){
        return {
            search : "",
            debounce : null,
        }
    },
    methods : {
        handleSearch(){
            this.$emit('search:news',this.search);
        },    
        debounceSearch(){
            clearTimeout(this.debounce);
            this.debounce = setTimeout( this.handleSearch ,1000);
        },
        handleClear(){
            this.search = "";

            this.$router.push({ path : 'news' , query : { search : this.search}});
        }
    },
    mounted(){
        this.search = "";
    }
}
</script>
