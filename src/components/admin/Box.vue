<template>
    <div id="box" class="col-3 bg-dark shadow-thm pt-5 pb-3 d-flex flex-column gap-3 align-items-start px-5">
        <h3 class="h3 txt-light fw-bold">{{ info.name }}</h3>
        <i :class="info.icon"></i>
        <h6 class="h6 thm" :id="info.name+'-count'">{{ info.count }}</h6>
    </div>
</template>

<script>

export default {
    name : 'Box',
    props : {
        info : {
            type : Object,
            default : {
                name : "",
                icon : "",
                count : 0,
            }
        }
    },
}
</script>