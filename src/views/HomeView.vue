<template>

  <section id="public-home-main" class="container-fluid p-0 row m-0">

    <Navbar />

    <div id="categories" class="container my-5 d-flex justify-content-center gap-2 flex-wrap">
      <Category text="Hello"/>
      <Category text="entertainment"/>
      <Category text="Technology"/>
    </div>

    <div id="today-news" class="col-xl-9 col-md-10 col-sm-12 mx-auto text-start">
      <span class="h2 text-start text-danger fw-bold">Today News</span>

      <div id="today-news-wrapper" class="container-fluid row my-4 gap-2 d-flex justify-content-center flex-wrap">
        <TodayNews :info="info"/>
        <TodayNews :info="info"/>
      </div>

    </div>

    <!-- news -->
    <div id="news-collection" class="col-xl-9 col-md-10 col-sm-12 mx-auto  text-start">
      <span class="h2 text-start text-danger fw-bold">News</span>

      <div id="news-wrapper" class="container-fluid row my-4 gap-2 d-flex justify-content-center flex-wrap">
        <News :info="info"/>
        <News :info="info"/>
        <News :info="info"/>
        <News :info="info"/>
      </div>
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

export default {
  components : {
    Navbar,
    Category,
    HomeFooter,
    TodayNews,
    News
  },
  data(){
    return{
      info : {
        image : "hello",
        title : "Hello World!",
        location : "Yangon",
      }
    }
  }
}
</script>