<template>
    <div class="news-box my-1 col-lg-5 col-none-12" id="news">
		<router-link to="/detail/1"> <img src="../../assets/logo.png" class="news-img" alt="image" />
			<div class="news-layer p-3 d-flex justify-content-end flex-column" >
				<span class="news-title text-capitalize fw-bold"> {{ info.title }} </span>
                 <span class="news-location fw-bold">|{{  info.location }}</span>
			</div>
		</router-link>
	</div>
</template>

<script>
export default {
    name : 'TodayNews',
    props : {
        info : Object,
        default : {
            image : "",
            title : "",
            location : ""
        }
    }
}
</script>