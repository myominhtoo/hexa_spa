<template>

    <div class="news-box my-1 col-xl-3 col-lg-4 col-sm-10 text-light fw-bold" id="news">
		<router-link to="/detail/1">
            <img src="../../assets/logo.png" class="news-img" alt="image" />
            <div class="news-layer d-flex flex-column justify-content-end p-2">
                <span class="news-title text-capitalize"> {{ info.image }} </span> 
                <span class="news-location text-capitalize">|{{ info.location }}</span>
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
            default : {
                image : "",
                title : "",
                location : "",
            }
        }
    }
}
</script>