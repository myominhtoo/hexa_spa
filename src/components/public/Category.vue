<template>
    <span class="p-2 shadow-sm text-danger text-capitalize fw-bold ">{{ text }}</span>
</template>

<script>
export default {
    name : 'Category',
    props : {
        text : {
            type : String ,
            default : ""
        }
    }
}
</script>