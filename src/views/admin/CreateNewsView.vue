<template>
  <main id="admin-home" class="container-fluid p-0 m-0 d-flex">

    <Sidebar/>

    <div id="admin-main" class="w-85">
        <Navbar/>

        <h1 class="my-5 thm h3 fw-bold">CREATE NEWS HERE!</h1>

        <form action="" class="card w-75 mx-auto p-3 text-start">
          <div class="form-group my-2">
            <label for="" class="form-label fw-bold txt-dark">News' Title</label>
            <input type="text" class="form-control" placeholder="e.g title about what happened">
          </div>

          <div class="form-group my-2">
            <label for="" class="form-label fw-bold txt-dark">News' Category</label>
            <select name="" id="" class="form-select text-capitalize">
              <option value="" selected disabled>Choose News' Category</option>
              <option value="">sport</option>
              <option value="">entertainment</option>
              <option value="">politics</option>
              <option value="">global</option>
            </select>
          </div>

          <div class="form-group my-2">
            <label for="" class="form-label fw-bold txt-dark">News' Location</label>
            <input type="text" class="form-control" placeholder="e.g Yangon">
          </div>

          <div class="form-group my-2">
            <label for="" class="form-label fw-bold txt-dark">News' Content</label>
            <textarea name="" id="" cols="30" rows="10" class="form-control" placeholder="e.g detail about what happened"></textarea>
          </div>

          <div class="form-group my-2">
            <label for="" class="form-label fw-bold txt-dark">News' Image</label>
            <input type="file" class="form-control">
          </div>

          <div class="form-group my-2">
            <button class="btn btn-primary w-100">Create</button>
          </div>
        </form>
    </div>
  </main>
</template>

<script>
import Sidebar from '../../components/admin/SideBar.vue';
import Navbar from '../../components/admin/Navbar.vue';

export default {
    name : 'CreateNewsView',
    components : {
        Navbar,
        Sidebar,
    }
}
</script>
