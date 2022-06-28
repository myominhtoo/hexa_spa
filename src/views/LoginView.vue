<template>

  <section id="login-main" class="container-fluid row d-flex justify-content-center align-items-center p-0 m-0">

      <main class="card p-3 col-xl-3 col-md-7 col-lg-4 col-sm-10">

        <header class="card-header">
            <h3 class="h3 text-center fw-bold txt-dark">Hexa</h3>
        </header>

        <form action="" class="card-body">
            <div class="form-group my-2 text-start">
              <label for="" class="form-label fw-bold txt-dark">Email Address</label>
              <input type="text" class="form-control" placeholder="Your Email Address">
              <i class="fa-solid fa-envelope txt-dark"></i>
            </div>

            <div class="form-group my-2 text-start">
              <label for="" class="form-label fw-bold txt-dark">Password</label>
              <input type="text" class="form-control" placeholder="Your Password">
              <i class="fa-solid fa-lock txt-dark"></i>
            </div>

            <div class="form-group my-2">
              <button class="btn btn-primary w-100 btn-sm">Login</button>
            </div>

            <div class="form-group d-flex justify-content-between align-item-center my-2">
              <router-link to="/" class="text-danger">Back</router-link>
              <router-link to="/register">Create?</router-link>
            </div>
        </form>

      </main>
      
      <Footer/>
  </section>

</template>

<script>
import Footer from '../components/public/Footer.vue';

export default {
  name : 'LoginView',
  components : {
    Footer
  }
}
</script>
