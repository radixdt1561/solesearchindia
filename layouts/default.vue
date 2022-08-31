<template>
  <div style="position: relative">
    <Notification class="notification" :notificationData="notificationData" />
    <Nuxt />
  </div>
</template>

<script>
const Notification = () => import("@/components/Notification");
export default {
  components: {
    Notification
  },
  computed: {
    notificationData() {
      return this.$store.getters["notification_alert/getNotificationAlert"];
    }
  }
};
</script>

<style lang="scss">
html {
  font-family: "Inter", sans-serif !important;
  overflow-x: hidden;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;

  font-size: 62.5%; // 10/16 =>.625*100 =>65.5%  => 1rem =10px
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  // ::-webkit-scrollbar {
  //   height: 12px;
  //   width: 12px;
  //   // background: white !important;
  //   cursor: pointer;
  // }

  // ::-webkit-scrollbar-thumb {
  //   background: black !important;
  //   -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
  //   box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
  // }

  // ::-webkit-scrollbar-corner {
  //   background: #000 !important;
  // }
}
body {
  font-family: "Inter", sans-serif !important;
  background: white;
  // ::-webkit-scrollbar {
  //   height: 12px;
  //   width: 12px;
  //   // background: #aaa !important;
  // }

  // ::-webkit-scrollbar-thumb {
  //   background: #393812 !important;

  //   -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
  //   box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
  // }

  // ::-webkit-scrollbar-corner {
  //   background: #000 !important;
  // }
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.btn-dark {
  background-color: #0f0f0f;
}

/* The Modal (background) */
.modal-container {
  max-height: 100%;
  max-width: 100%;
  display: block;
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100vw; /* Full width */
  height: 100vh; /* Full height */
  overflow: hidden; /* Enable scroll if needed */
  background: white;
}

.spinner-border {
  width: 6rem;
  height: 6rem;
}

.sidebar-width {
  @media only screen and (max-width: 499px) {
    width: 80% !important;
  }

  @media only screen and (min-width: 500px) {
    width: 60% !important;
  }

  @media only screen and (min-width: 900px) {
    width: 40% !important;
  }
}

.swiper-pagination-bullet-active {
  background-color: black !important;
}

.small {
  min-height: 40px !important;
  max-width: 160px !important;
}

.dropdown-item:active {
  background-color: white;
}

.dropdown-item {
  font-size: 16px;
}
.dropdown-item:hover {
  color: #ee2257;
  background-color: white;
}

td {
  cursor: pointer;
}
.grid {
  display: grid;
  grid-gap: 0.5rem;
  max-width: 136.6rem;
  margin: 0 auto;
  cursor: pointer;
  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (min-width: 400px) and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
.notification {
  position: fixed;
  z-index: 9999;
  @media screen and (max-width: 575px) {
    width: 200px !important;
  }
  @media screen and (min-width: 575px) {
    width: 300px !important;
  }
}

.navbar-light .navbar-nav .nav-link {
  color: #0f0f0f;
  :hover {
    color: #ee2257;
  }
}

.swiper-button-prev {
  color: black;
  left: 0;
}

.swiper-button-next {
  color: black;
  right: 0;
}

.cursor {
  cursor: pointer !important;
}

.black-button {
  max-width: 278px;
  width: 100%;
  min-height: 50px;
  border-radius: 4px;
  appearance: none;
  border-width: 2px;
  font-size: 14px;
  background: rgb(10, 10, 10);
  color: white;
  font-weight: 500;
  letter-spacing: 1.68px;
  border-style: solid;
  border: 2px solid black;
  text-transform: uppercase;
}

.red-button {
  max-width: 278px;
  width: 100%;
  min-height: 50px;
  border-radius: 4px;
  appearance: none;
  border-width: 2px;
  font-size: 14px;
  background: red;
  color: white;
  font-weight: 500;
  letter-spacing: 1.68px;
  border-style: solid;
  border: 2px solid red;
  text-transform: uppercase;
}

.green-button {
  max-width: 278px;
  width: 100%;
  min-height: 50px;
  border-radius: 4px;
  appearance: none;
  border-width: 2px;
  font-size: 14px;
  background: rgb(0, 99, 64);
  color: white;
  font-weight: 500;
  letter-spacing: 1.68px;
  border-style: solid;
  border: 2px solid rgb(0, 99, 64);
  text-transform: uppercase;
}

.red-button:hover {
  transition: background-color 0.06s ease 0s;
  background: white;
  color: red;
}

.black-button:hover {
  transition: background-color 0.06s ease 0s;
  background: white;
  color: rgb(10, 10, 10);
}

.green-button:hover {
  transition: background-color 0.06s ease 0s;
  background: white;
  color: rgb(0, 99, 64);
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  color: rgb(28, 28, 32);
  font-weight: 600;
  letter-spacing: 1.44px;
}

select {
  cursor: pointer;
  text-align: center;
}

.product-carousel-title {
  font-size: 24px;
  font-weight: 600;
  @media screen and (max-width: 992px) and (min-width: 400px) {
    font-size: 20px;
  }
  @media screen and (max-width: 400px) {
    font-size: 16px;
  }
}

button {
  letter-spacing: 1.44px;
}

svg {
  display: block;
}

input,
textarea,
button,
select,
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
  outline: none !important;
}
input,
textarea,
button,
select,
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
  outline: none !important;
}

.remove:focus {
  outline: none !important;
}

button:active:hover:focus,
a:active:hover:focus,
svg:active:hover:focus {
  outline: none !important;
}

.nav-link {
  padding: 0;
  color: white;
}

.navbar-expand-lg .navbar-nav .nav-link {
  padding-right: 12px;
  padding-left: 12px;
}

.navbar-dark .navbar-nav .nav-link {
  color: white;
  font-weight: 300;
  // font-size: 14px;
}

.navbar-dark .navbar-nav .nav-link:hover,
.navbar-dark .navbar-nav .nav-link:focus {
  color: #ee2257;
}

.navbar-expand .navbar-nav .nav-link {
  padding-right: 12px;
  padding-left: 12px;
}

.dropdown-item {
  font-size: 16px;
  color: #0f0f0f;
  a {
    color: #0f0f0f;
  }
}

.modal-text {
  font-size: 16px;
  font-weight: 500;
}

svg:hover {
  color: #ee2257 !important;
}
</style>
