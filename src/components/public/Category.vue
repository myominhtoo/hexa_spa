<template>
    <router-link :to="{ path : '/news' , query : { 'category' : id } }"  class="p-2 shadow-sm text-danger text-decoration-none text-capitalize fw-bold" id="category">{{ text }}</router-link>
</template>

<script>
export default {
    name : 'Category',
    props : {
        text : {
            type : String ,
            default : "",
        },
        id : {
            type : Number,
            default : null,
        }
    }
}
</script>