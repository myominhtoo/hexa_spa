<template>
    <div class="news-box my-1 col-lg-5 col-none-12 p-0" id="news">
		<router-link :to="'/news/'+info.news_id"> <img :src="'http://localhost:8080/img/'+ info.news_img" class="news-img" alt="image" />
			<div class="news-layer p-3 d-flex justify-content-end flex-column" >
				<span class="news-title text-capitalize fw-bold"> {{ info.news_name }} </span>
                 <span class="news-location fw-bold">|{{  info.news_location }}</span>
			</div>
		</router-link>
	</div>
</template>

<script>
export default {
    name : 'TodayNews',
    props : {
        info : Object,
    }
}
</script>