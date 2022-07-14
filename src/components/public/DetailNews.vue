<template>
    <div id="detail-news" class="col-xl-8 col-none-12 my-5">
        <h3 class="h3 thm fw-bold text-center text-capitalize" id="news-title">"{{ info.news_name }}"</h3>

        <div id="detail-image" class="my-3">
            <img :src="'http://localhost:8080/img/'+ info.news_img" alt="image">
            <div id="detail-layer" class="p-2 d-flex flex-column justify-content-end align-items-start">
                <span class="fw-bold thm "><i class="fa-solid fa-location-dot mx-1"></i>{{ info.news_location }}</span>
                <span class="fw-bold thm ">{{ getPeriod( info.created_date , "yy-mm-dd") }}</span>
            </div>
        </div>
        
        <div id="detail-content" class="w-100 text-start">
            <p v-html="info.descriptions" id="news-content" class="w-100 txt-dark fw-bold"></p>
        </div>

    </div>
</template>

<script>
import getPeriod from '@/composables/getPeriod'

export default {
    name : 'DetailNews',
    props : {
        info : {
            type : Object,
            default : {}
        }
    },
    setup(){
        return { getPeriod  }
    }
}
</script>