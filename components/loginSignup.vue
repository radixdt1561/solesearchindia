<template>
  <div>
    <div class="loginSignup">
      <div class="loginSignupdiv">
        <nav v-if="!isForgotPasswordActive && noNavHeader">
          <ul>
            <li
              v-on:click="showSignup"
              :class="IsSignup == true ? 'active' : ''"
            >
              <button>Sign Up</button>
            </li>
            <li v-on:click="showLogin" :class="IsLogin == true ? 'active' : ''">
              <button>Log In</button>
            </li>
            <!-- <li><nuxt-link to="/signup"><button> Sign Up</button></nuxt-link></li>
          <li><nuxt-link to="/login"><button> Log In</button></nuxt-link></li> -->
          </ul>
        </nav>
        <div class="signup" v-if="IsSignup">
          <Signup
            @buyerSignedUp="buyerSignedUp"
            @hideNav="hideNav"
            :msg="msg"
            :href="href"
          />
        </div>
        <div class="login" v-if="IsLogin && !isForgotPasswordActive">
          <login @reset="setForgotPassword" @loggedIn="loggedIn" />
        </div>
        <div class="reset" v-if="isForgotPasswordActive">
          <Reset
            @emailSent="emailSent"
            @reset="setForgotPassword"
            :msg="msg"
            :href="href"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import login from "@/components/login.vue";
import Signup from "@/components/signup.vue";
import Reset from "@/components/ResetPassword.vue";

export default {
  components: {
    login,
    Signup,
    Reset
  },
  data() {
    return {
      IsSignup: false,
      IsLogin: true,
      isForgotPasswordActive: false,
      noNavHeader: true
    };
  },
  props: {
    msg: {
      type: String
    },
    href: {
      type: String
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
    loggedIn(value) {
      this.$emit("loggedIn", value);
    },
    buyerSignedUp(value) {
      this.$emit("buyerSignedUp", value);
    },
    hideNav(value) {
      this.noNavHeader = false;
    },
    emailSent(value) {
      this.isForgotPasswordActive = !value;
    }
  }
};
</script>
<style lang="scss" scoped>
.loginSignup {
  background-color: white;
  // min-height: 57.7rem;
  padding: 9rem 5rem 3rem 5rem;
  @media screen and (max-width: 425px) {
    padding: 2rem;
  }
  .loginSignupdiv {
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 992px) {
      max-width: 40rem;
    }
    // max-height: 45rem;
    margin: 0 auto;
    nav {
      ul {
        padding: 0rem;
        list-style: none;
        text-align: center;
        display: flex;
        flex-direction: row;
        // padding: 0rem 1.5rem;
        li {
          width: 100%;
          button {
            width: 100%;
            font-weight: bold;
            font-size: 1.8rem;
            color: #b4b4b4;
            padding-bottom: 0.4rem;
            border: none;
            outline: none;
            background: white;
            border-bottom: solid 1px #b4b4b4;
          }
        }
        .active,
        li:hover,
        li:active {
          button {
            border-bottom: solid 1px black;
            font-weight: bold;
            color: black;
          }
        }
      }
    }
  }
}
</style>
