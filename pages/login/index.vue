<template>
  <div>
    <Header />
    <TheSideNav />
    <div class="d-flex justify-content-center mt-5 wrapper">
      <div class="loginSignup">
        <div class="loginSignupdiv">
          <nav v-if="!isForgotPasswordActive">
            <ul>
              <!-- <li v-on:click="showSignup" :class="(IsSignup==true)?'active':''"><button>Sign Up</button></li>
            <li v-on:click="showLogin" :class="(IsLogin==true)?'active':''"><button>Log In</button></li> -->
              <li :class="IsSignup == true ? 'active' : ''">
                <nuxt-link to="/signup"><button>Sign Up</button></nuxt-link>
              </li>
              <li :class="IsLogin == true ? 'active' : ''">
                <nuxt-link to="/login"><button>Log In</button></nuxt-link>
              </li>
            </ul>
          </nav>
          <div class="signup" v-if="IsSignup">
            <Signup />
          </div>
          <div class="login" v-if="IsLogin && !isForgotPasswordActive">
            <Login @reset="setForgotPassword" @goFurther="goFurther" />
          </div>
          <Reset
            v-if="isForgotPasswordActive"
            @emailSent="emailSent"
            @reset="setForgotPassword"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import TheSideNav from "@/components/TheSidenav.vue";

import Login from "@/components/login.vue";
import Signup from "@/components/signup.vue";
import Reset from "@/components/ResetPassword.vue";
export default {
  components: {
    Login,
    Header,
    TheSideNav,
    Signup,
    Reset
  },
  data() {
    return {
      IsSignup: false,
      IsLogin: true,
      isForgotPasswordActive: false,
      from: ""
    };
  },
  middleware: ["check-auth"],
  computed: {
    user() {
      return this.$store.getters["authentication/getUser"];
    },
    token() {
      return this.$store.getters["authentication/idToken"];
    }
  },
  methods: {
    showLogin() {
      this.IsLogin = true;
      this.IsSignup = false;
      //   this.isactive="active"
      //   console.log('showlogin')
    },
    showSignup() {
      this.IsSignup = true;
      this.IsLogin = false;
      //   this.isactive="active"
    },
    setForgotPassword(event) {
      this.isForgotPasswordActive = event;
    },
    emailSent(value) {
      this.isForgotPasswordActive = !value;
    },
    goFurther() {
      if (this.from == "wishlist")
        this.$router.replace(`/wishlist/user-wishlist`);
      else this.$router.replace("/seller");
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.user != null) vm.$router.replace("/");
      if (from.name == "wishlist") vm.from = from.name;
    });
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: white;
  margin-top: 0rem !important;
  padding-top: 3rem;
}
.loginSignup {
  //   border: 1px solid red;
  background-color: white;
  min-height: 40rem;
  max-width: 48rem;
  // display: flex;
  // justify-content: center;
  // align-items: center;

  padding: 4rem;
  @media screen and (max-width: 370px) {
    padding: 2rem;
  }

  .loginSignupdiv {
    // border: 1px solid green;
    display: flex;
    flex-direction: column;
    nav {
      ul {
        // border: 1px solid blue;
        padding: 0rem;
        list-style: none;
        text-align: center;
        display: flex;
        flex-direction: row;
        // padding: 0rem 1.5rem;
        li {
          // border: 1px solid blue;
          width: 100%;
          button {
            width: 100%;
            font-weight: bold;
            font-size: 1.8rem;
            background: white;
            color: #b4b4b4;
            padding-bottom: 0.4rem;
            border: none;
            outline: none;
            border-bottom: solid 1px #b4b4b4;
          }
        }
        .active,
        li:hover,
        li:active {
          // border: 1px solid red;
          button {
            border-bottom: solid 1px rgb(19, 19, 21);
            font-weight: bold;
            color: rgb(19, 19, 21);
          }
        }
      }
    }
  }
}
</style>
