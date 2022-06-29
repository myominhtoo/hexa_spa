<template>

  <section id="public-home-main" class="container-fluid p-0 row m-0">

    <Navbar />

    <div v-if="categories.length" id="categories" class="container my-5 d-flex justify-content-center gap-2 flex-wrap">
      <Category v-for="category in categories" :key="category" :text="category.news_category_name"/>
    </div>

    <div v-if="todayNews.length" id="today-news" class="col-xl-9 col-md-10 col-sm-12 mx-auto text-start">
      <span class="h2 text-start text-danger fw-bold">Today News</span>

      <div id="today-news-wrapper" class="container-fluid row my-4 gap-2 d-flex justify-content-center flex-wrap">
        <TodayNews v-for="news in todayNews" :key="news.news_id" :info="news"/>
      </div>

    </div>

    <!-- news -->
    <div v-if="allNews.length" id="news-collection" class="col-xl-9 col-md-10 col-sm-12 mx-auto  text-start">
      <span class="h2 text-start text-danger fw-bold">News</span>

      <div id="news-wrapper" class="container-fluid row my-4 gap-2 d-flex justify-content-center flex-wrap">
        <News v-for="news in allNews" :key="news.news_id" :info="news"/>
      </div>
    </div>

    <div v-else class="p-5 text-center">
      Loading...
    </div>

    <!-- footer -->
    <HomeFooter/>
  </section>

</template>

<script>
import Navbar from '../components/public/Navbar.vue';
import Category from '../components/public/Category.vue';
import HomeFooter from '../components/public/HomeFooter.vue';
import TodayNews from '../components/public/TodayNews.vue';
import News from '../components/public/News.vue';
import { mapActions , mapGetters } from 'vuex';

export default {
  components : {
    Navbar,
    Category,
    HomeFooter,
    TodayNews,
    News
  },
  methods : {
    ...mapActions(['getCategories','getTodayNews','getAllNews']),
  },
  computed : {
    ...mapGetters(['categories','todayNews','allNews']),
  },
  mounted(){
    this.getCategories();
    this.getTodayNews();
    this.getAllNews();
    // console.log(this.todayNews)
  }
}
</script>