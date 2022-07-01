<template>
  <div id="pagination" class="w-100 d-flex justify-content-center">
     <ul class="pagination">
        <li class="page-item " @click="$emit('go:prev',page)"><span class="page-link"><i class="fa-solid fa-angles-left"></i></span></li>
        <li v-for="page in totalPage" :key="page" class="page-item" @click="$emit('go:to',page)"><span v-if="page <= 10" class="page-link" :class="{'fw-bold text-primary' : page == curPage ? true : false }">{{ page }}</span></li>
        <li class="page-item" @click="$emit('go:next',page)" ><span class="page-link"><i class="fa-solid fa-angles-right"></i></span></li>
     </ul>
  </div>
</template>

<script>
export default {
   emits : ['go:to','go:prev','go:next'],
   props : {
      curPage : {
         type : Number,
         default : 1,
      },
      totalPage : {
         type : Number , 
         default : 1,
      },
   },
   
}
</script>

<style>

</style>