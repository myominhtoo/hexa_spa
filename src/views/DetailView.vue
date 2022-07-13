<template>
   
    <section id="public-detail-main" class="container-fluid p-0 row m-0 ">

      <Navbar @update:infos="updateInfo" :userInfo="userInfo" :isLogin="isLogin"/>

        <div class="mx-auto col-xl-10 col-md-12" >
            <div id="detail-wrapper" class="container-fluid row ">
                <DetailNews v-if="news != null"  :info="news"/>

                <div v-if="otherNews.length" id="other-news-contaniner" class="col-xl-4 col-none-12 my-5 d-flex flex-column gap-2">
                    <h3 class="h3 text-danger text-center fw-bold">Latest News</h3>

                    <OtherNews v-for="news in otherNews" :key="news" :info="news"/>
                </div>
            </div>

            <div id="comments-wrapper" class="container-fluid row my-5">
                <div  v-if="isLogin && userInfo != ''" id="comment-input" class="col-lg-6 col-none-12 my-3">
                    <form @submit.prevent="handleComment" class="w-100 h-auto">
                        <textarea v-model="comment" name="" id="" cols="30" rows="7" class="form-control" placeholder="Comment here"></textarea>
                        <button class="btn btn-primary my-2 w-100">Comment</button>
                    </form>
                </div>

                <div v-show="publicComments.length" id="comments" class="col-lg-6 col-none-12 my-3">
                   <div v-for="cmt,idx in publicComments" :key="cmt.comment_id" class="w-auto h-auto p-0 m-0">
                        <Comment @delete="handleCommentDelete" @update="handleCommentUpdate" v-if="idx <= (cmtMax - 1)" :data="cmt" :isLogin="isLogin" :userInfo="userInfo" />
                   </div>
                   <p v-if="publicComments.length > 2" class="text-decoration-underline fw-bold text-primary text-start p-0 m-0" @click="toggleShowComment"><span v-show="seeMore">See Less</span><span v-show="!seeMore">See More</span></p>
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
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import getUpdateInfo from '@/composables/getUpdateInfo';

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
            },
            curNewsId : null,
            watcher : null,
            commentWatcher : null,
            seeMore : false,
            cmtMax : 2,//to render
            comment : "",
        }
    },
    setup(){
        const { updateInfo } = getUpdateInfo();

        return { updateInfo };
    },
    methods : {
        toggleShowComment(){
            this.seeMore = !this.seeMore;
            
            this.cmtMax = this.seeMore ? this.publicComments.length : 2;
        },
        async handleComment(){
           if((this.userInfo != "" || this.userInfo != undefined ) && this.comment != ""){
                let  news_id = this.$route.params.id;
                const data = {
                    user_id :window.atob(this.userInfo.user_id),
                    news_id : news_id,
                    comments : this.comment,
                }
                
                const res = await axios.post(`http://localhost:8080/hexa/api/news/${news_id}/createcomment?_token=${window.atob(this.userInfo._token)}&email=${window.atob(this.userInfo.user_email)}`,data);

                if(res.data == "Success"){
                    this.getPublicComments(news_id);
                    this.comment = "";
                }
           }

        },  
        async handleCommentDelete( commentId ){
           const res = await axios.delete(`http://localhost:8080/hexa/api/news/${this.$route.params.id}/comments/${commentId}`);
           
           if(res.data == "Success"){
                this.getPublicComments(this.$route.params.id);
           }
        },
        handleCommentUpdate( newsId ){
            this.getPublicComments(newsId)
        },
        ...mapActions(['getNews','getOtherNews','getPublicComments','getUserInfo']),
    },
    computed : {
        ...mapGetters(['news','otherNews','publicComments','userInfo','isLogin']),
    },
    created(){
        this.curNewsId = this.$route.params.id;
       
        this.getNews(this.curNewsId);
        this.getOtherNews(this.curNewsId);
        this.getPublicComments(this.curNewsId);

       this.watcher =   this.$watch(
            () => this.$route.params.id,
            () => {
                this.curNewsId = this.$route.params.id;

                if(typeof this.curNewsId != "undefined"){
                    this.getNews(this.curNewsId);
                    this.getOtherNews(this.curNewsId);
                    this.getPublicComments(this.curNewsId);
                }
            }
        );

        this.commentWatcher = this.$watch(
            () => this.publicComments,
            () => {
                this.cmtMax = this.seeMore ? this.publicComments.length : 2;
            }
        );
    },
    mounted(){
        this.getUserInfo();

    },
    unmounted(){
        this.watcher();
        this.commentWatcher();
    },
}
</script>