<template>
    <router-link :to="{ path : '/news/'+info.news_id }" class="w-100 h-auto row my-3 p-0 gap-2" id="filter-news">
        <div id="image" class="col-lg-3  col-none-12  p-0 m-0 shadow-sm" style="height:200px" >
            <img :src="'http://localhost:8080/img/'+info.news_img" alt="">
            <div id="layer" class="d-flex flex-column align-items-start justify-content-end p-2">
                <span id="title" class="text-capitalize text-start">{{ info.news_name }}</span>
                <span id="location" class="text-capitalize">|{{ info.news_location }}</span>
            </div>
        </div>

        <div id="content" class="col-lg-8 col-none-12 d-flex justify-content-center align-items-center">
            <p v-html="info.descriptions.substring(0,150)+'...'" class="text-start fw-bold txt-dark" id="details"></p>
        </div>
    </router-link>
</template>

<script>
export default {
    name : 'FilterNews',
    props : {
        info : {
            type : Object,
            default : null,
        }
    }
}
</script>
