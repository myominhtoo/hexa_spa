<template>
   
    <section id="public-detail-main" class="container-fluid p-0 row m-0 ">

        <Navbar />

        <div class="mx-auto col-xl-10 col-md-12" >
            <div id="detail-wrapper" class="container-fluid row ">
                <DetailNews/>

                <div id="other-news-contaniner" class="col-xl-4 col-none-12 my-5 d-flex flex-column gap-2">
                    <h3 class="h3 text-danger text-center fw-bold">Latest News</h3>

                    <OtherNews :info="info"/>
                    <OtherNews :info="info"/>
                    <OtherNews :info="info"/>
                    <OtherNews :info="info"/>
                </div>
            </div>

            <div id="comments-wrapper" class="container-fluid row my-5">
                <div id="comment-input" class="col-lg-6 col-none-12 my-3">
                    <form action="" class="w-100 h-auto">
                        <textarea name="" id="" cols="30" rows="7" class="form-control" placeholder="Comment here"></textarea>
                        <button class="btn btn-primary my-2 w-100">Comment</button>
                    </form>
                </div>

                <div id="comments" class="col-lg-6 col-none-12 my-3">
                    <Comment/>
                    <Comment/>
                    <Comment/>

                </div>
            </div>
        </div>
        
        <!-- footer -->
        <HomeFooter/>
  </section>

</template>

<script>
import Navbar from '../components/public/Navbar.vue';
import HomeFooter from '../components/public/HomeFooter.vue';
import DetailNews from '../components/public/DetailNews.vue';
import OtherNews from '../components/public/OtherNews.vue';
import Comment from '../components/public/Comment.vue';

export default {
    name : 'DetailView',
    components : {
        Navbar,
        HomeFooter,
        DetailNews,
        OtherNews,
        Comment
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