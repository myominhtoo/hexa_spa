<template>

    <div class="news-box my-1 w-100 text-light fw-bold" id="news">
		<router-link :to="'/news/'+info.news_id">
            <img :src="'http://localhost:8080/img/'+info.news_img" class="news-img" alt="image" />
            <div class="news-layer d-flex flex-column justify-content-end align-items-start text-start p-2">
                <span class="news-title text-capitalize"> {{ info.news_name }} </span> 
                <span class="news-location text-capitalize">|{{ info.news_location }}</span>
            </div>
		</router-link>
	</div>

</template>

<script>
export default {
    name : 'News',
    props : {
        info : {
            type : Object,
            default : {}
        }
    }
}
</script>