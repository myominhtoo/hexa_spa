<template>
    <div id="detail-news" class="col-xl-8 col-none-12 my-5">
        <h3 class="h3 thm fw-bold text-center text-capitalize" id="news-title">"{{ info.news_name }}"</h3>

        <div id="detail-image" class="my-3">
            <img :src="'http://localhost:8080/img/'+ info.news_img" alt="image">
            <div id="detail-layer" class="p-2 d-flex justify-content-start align-items-end">
                <span class="fw-bold txt-light "><i class="fa-solid fa-location-dot mx-1"></i>{{ info.news_location }}</span>
            </div>
        </div>
        
        <div id="detail-content" class="w-100 text-start">
            <p v-html="info.descriptions" id="news-content" class="w-100 txt-dark fw-bold"></p>
        </div>

    </div>
</template>

<script>
export default {
    name : 'DetailNews',
    props : {
        info : {
            type : Object,
            default : {}
        }
    },
}
</script>