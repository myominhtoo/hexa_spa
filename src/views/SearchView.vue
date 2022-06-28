<template>

  <section id="public-home-main" class="container-fluid p-0">

    <Navbar />

    <main class="container row my-5 mx-auto d-flex justify-content-center">
        <div class="d-flex align-items-center gap-1 col-sm-12 col-md-10 col-xl-8 ">
            <input type="search" class="form-control" placeholder="Search you want">
            <button class="btn btn-primary p-2 px-3"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
    </main>

  </section>

</template>

<script>
import Navbar from '../components/public/Navbar.vue';

export default {
  components : {
    Navbar
  }
}
</script>

<style>

</style>