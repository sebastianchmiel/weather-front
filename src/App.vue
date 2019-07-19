<template>
  <div id="app">
    <header
      class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom box-shadow"
    >
      <router-link :to="{ name: 'Map' }" class="my-0 mr-md-auto">
        <h5 class="font-weight-normal">WeatherApp</h5>
      </router-link>
      <nav class="my-2 my-md-0 mr-md-3">
        <router-link :to="{ name: 'Map' }">Map</router-link>
        <router-link :to="{ name: 'History' }">History</router-link>
      </nav>
    </header>
    <div class="content">

      <router-view></router-view>

      <div class="container-fluid">
        <footer class="pt-3 mt-3">
          <div class="row">
            <div class="col-12 col-md text-center">
              <a href="https://arcyreklama.pl/">ArcyReklama.pl Sebastian Chmiel</a>
              <small class="d-block mb-3 text-muted">&copy; {{ new Date().getFullYear() }}</small>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style>
  body {
    background-color: #eee;
    padding-top: 65px;
    color: #444;
  }
  a {
    color: #e74c3c;
  }
  a:hover {
    color: #c0392b;
  }
  #app > header {
    position: absolute;
    top: 0;
    -webkit-box-shadow: 0px 6px 29px 1px rgba(176,176,176,1);
    -moz-box-shadow: 0px 6px 29px 1px rgba(176,176,176,1);
    box-shadow: 0px 6px 29px 1px rgba(176,176,176,1);
    width: 100%;
    z-index: 100;
  }
  .content {
    position: relative;
  }
  footer {
    font-size: 12px;
  }
  nav a {
    padding: 8px 20px;
    color: #333;
    transition: background-color .4s ease-in-out;
    border-radius: 50px;
    text-decoration: none;
    font-size: 14px;
  }
  nav .router-link-exact-active {
    background: #e74c3c;
    color: #fff!important;
  }
</style>
