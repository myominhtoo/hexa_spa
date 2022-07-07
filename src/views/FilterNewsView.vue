<template>
    
    <section id="public-home-main" class="container-fluid p-0 row m-0">
        <Navbar :userInfo="userInfo" :isLogin="isLogin"/>

        <div v-if="categories.length && typeof $route.query.category == 'string'" id="categories" class="container my-5 d-flex justify-content-center gap-2 flex-wrap">
            <Category v-for="category in categories" :key="category" :text="category.news_category_name" :id="category.news_category_id" />
        </div>

        <Search :show="isSearch"  @search:news="handleNewsSearch"/>

        <div v-if="( datas.length > 0 && !hasNotFoundError)" class="w-75 row p-3 mx-auto d-flex flex-column gap-3 my-5" id="news-wrapper">
            <FilterNews v-for="data in datas" :key="data.news_id" :info="data" />
        </div>

        <div v-if="isLoading && !hasError" class="w-75 mx-auto my-5">
           <h1 class="text-center text-danger h3"> Loading...</h1>
        </div>

        <div v-if="hasNotFoundError || hasError" class="w-75  mx-auto d-flex justify-content-center align-items-center my-3 row p-0" style="height:300px;">
             <img src="http://localhost:8080/img/404.gif"  alt="" class="col-xl-7 col-none-12">
        </div>

        <div v-if="isSearch && !hasNotFoundError && datas.length == 0 && typeof $route.query.search != 'undefined'"   class="w-75  mx-auto d-flex justify-content-center align-items-center my-3 row p-0" style="height:500px;">
             <img src="http://localhost:8080/img/search.jpg"  alt="" class="col-xl-7 col-none-12 h-100">
        </div>


        <!-- footer -->
        <HomeFooter/>
  </section>

</template>

<script>
import Navbar from '@/components/public/Navbar.vue';
import Category from '@/components/public/Category.vue';
import HomeFooter from '@/components/public/HomeFooter.vue';
import FilterNews from '@/components/public/FilterNews.vue';
import Search from '@/components/public/Search.vue';
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default {
    name : 'FilterNewsView',
    components : {
        Category,
        Navbar,
        HomeFooter,
        FilterNews,
        Search
    },
    data(){
        return {
            isLoading : true,
            isSearch : false,
            hasError : false,
            hasNotFoundError : false,
            datas : [],
            categoryWatcher : null,
            pageWatcher : null,
            searchWatcher : null,
        }
    },
    methods : {
        async fetchNewsByCategory( categoryId ){
            const res = await axios.get(`http://localhost:8080/hexa/api/news/category?c=${categoryId}`);
   
           res.data.length == 0 
           ? this.hasNotFoundError = true
           : this.hasNotFoundError = false;

            this.datas = res.data;
        },
        async fetchNewsBySeach( search ){
            const res = await axios.get(`http://localhost:8080/hexa/api/news/search?s=${search}`);

            res.data.length == 0
            ? this.hasNotFoundError = true
            : this.hasNotFoundError = false;


            this.datas = res.data;
        },
        checkSearchPage(){
            let search = this.$route.query.search;
            let isSearch = false;

            (search == "''" || typeof search != 'undefined') || typeof search == 'object' || search == ""
            ? isSearch = true
            : isSearch = false;

            return isSearch;
        },
        checkCategoryPage(){
            let category = this.$route.query.category;
            let isCategory = false;

            typeof category != 'undefined' && !isNaN(category)
            ? isCategory = true
            : isCategory = false;

            return isCategory;
        },
        handleNewsSearch( search ){
            this.$router.push({path : 'news', query : { 'search' : search }});
        },
        ...mapActions(['getCategories','getUserInfo']),
    },
    computed : {
        ...mapGetters(['categories','userInfo','isLogin']),
    },
    created(){
        this.getCategories();
    },
    mounted(){
        let category = this.$route.query.category;
        let search = this.$route.query.search;


        if(this.checkCategoryPage()){
            this.hasError = false;
            this.hasNotFoundError = false;
        }else{
            this.hasError = true;
        }

         if(this.checkSearchPage()){
             this.isSearch = true;
             this.hasError = false;
             this.hasNotFoundError = false;
             this.isLoading = false;
         }
        
        

        if(typeof category != "undefined" && !isNaN(category)) {
            this.isSearch = false;
            this.fetchNewsByCategory(this.$route.query.category);
            this.isLoading = false;
        }


        if(typeof search != 'undefined' && search != "''" && search != ""){
            this.isSearch = true;
            this.fetchNewsBySeach(search);
            this.isLoading = false;
        }


        this.categoryWatcher = this.$watch(
            () => this.$route.query.category,
            () => {
                let category = this.$route.query.category;
                this.hasNotFoundError = false;


                if(typeof category != "undefined"  && !isNaN(category)){
                    this.fetchNewsByCategory(category);
                }
            }
        )


        this.pageWatcher = this.$watch(
            () => this.$route.href,
            () => {
                if(this.checkSearchPage()){
                    this.datas = [];
                    this.isSearch = true;
                    this.hasError = false;
                    this.hasNotFoundError = false;
                    this.isLoading = false;
                }else{
                    this.isSearch = false;
                }
            }
        )

        this.searchWatcher = this.$watch(
            () => this.$route.query.search,
            () => {
                let search = this.$route.query.search;
                
                if(typeof search != 'undefined' && search != "''" && search != "")  this.fetchNewsBySeach(search)
            }
        )
    },
    unmounted(){
        this.categoryWatcher();
        this.pageWatcher();
        this.searchWatcher();
    }
    
}
</script>