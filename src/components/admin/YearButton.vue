<template>
    <button @click="$emit('change:year',year)" id="year-btn" class="year-btn btn-sm px-3 fw-bold py-1" :class="{'btn-primary txt-light' : isActive ? true : false }">{{ year }}</button>
</template>

<script>
export default {
    name : "YearButton",
    props : {
        isActive : {
            type : Boolean,
            default : false,
        },
        year : {
            type : Number , 
            default : 0,
        }
    },
    emits : ['change:year']
}
</script>