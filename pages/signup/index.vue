<template>
  <div>
    <Header />
    <TheSideNav />

    <div class="d-flex justify-content-center mt-5 wrapper">
      <div class="loginSignup">
        <div class="loginSignupdiv">
          <nav>
            <ul v-if="signedupAck">
              <li :class="IsSignup == true ? 'active' : ''">
                <nuxt-link to="/signup"><button>Sign Up</button></nuxt-link>
              </li>
              <li :class="IsLogin == true ? 'active' : ''">
                <nuxt-link to="/login"><button>Log In</button></nuxt-link>
              </li>
            </ul>
          </nav>
          <div class="signup" v-if="IsSignup">
            <Signup @signedup="showHeadButton" />
          </div>
          <div class="login" v-if="IsLogin">
            <login />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import TheSideNav from "@/components/TheSidenav.vue";
import login from "@/components/login.vue";
import Signup from "@/components/signup.vue";
export default {
  components: {
    login,
    Header,
    TheSideNav,

    Signup
  },
  data() {
    return {
      IsSignup: true,
      IsLogin: false,
      signedupAck: true
    };
  },
  methods: {
    showLogin() {
      this.IsLogin = false;
      this.IsSignup = true;
      //   this.isactive="active"
      //   console.log('showlogin')
    },
    showSignup() {
      this.IsSignup = false;
      this.IsLogin = true;
      //   this.isactive="active"
    },
    showHeadButton(value) {
      this.signedupAck = value;
    }
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
  background-color: white;
  min-height: 40rem;
  // max-width: 48rem;
  padding: 4rem;
  @media screen and (max-width: 370px) {
    padding: 2rem;
  }

  .loginSignupdiv {
    display: flex;
    flex-direction: column;
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
            background: white;
            font-size: 1.8rem;
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
          button {
            border-bottom: solid 1px #131315;
            font-weight: bold;
            color: #131315;
          }
        }
      }
    }
  }
}
</style>
