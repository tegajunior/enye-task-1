<template>
  <div class="d-flex justify-content-center">
    <div>
      <div
        class="display-4 text-primary mt-3 mt-lg-5 animate__animated animate__slideInLeft"
      >
        Welcome
      </div>
      <router-link
        class="btn btn-primary text-white p-2 mt-3 animate__animated animate__bounceInUp"
        to="/records"
      >
        View Records
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>
