<template>
  <div>
    <div class="signup">
      <div class="signupdiv">
        <form @submit.prevent.stop="login">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            v-model="email"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            v-model="password"
          />
          <span class="view-password-login" @click="showPassword"
            ><img :src="require(`../assets/images/views/${src}`)" :alt="alt"
          /></span>
          <button
            type="button"
            class="forgotpassword"
            @click="$emit('reset', true)"
          >
            Forgot Password?
          </button>
          <button
            type="submit"
            :class="isdisabled == true ? 'active' : 'inactive'"
          >
            LOG IN
          </button>
        </form>
        <div class="terms_conditions">
          By logging in, you agree to the
          <a href=""> Terms of Service</a> and
          <a href="">Privacy Policy</a>
        </div>
      </div>
    </div>
    <!-- <Signup v-if="IsSignup" /> -->
  </div>
</template>

<script>
import Signup from "@/components/signup.vue";
export default {
  name: "login",
  components: {
    Signup,
  },
  data() {
    return {
      // fblogintrialurl:"https://www.facebook.com/v9.0/dialog/oauth?client_id=1101288090321392&redirect_uri=http://localhost:8001/callback&state=facebook&display=popup&response_type=token&scope=email",
      fblogintrialurl:
        "https://www.facebook.com/v9.0/dialog/oauth?client_id=1101288090321392&redirect_uri=https://www.dryp.in/callback&state=facebook&display=popup&response_type=token&scope=email",
      email: "",
      password: "",
      IsSignup: false,
      IsLogin: true,
      IsForgotPassword: false,
      src: "views@2x.png",
      alt: "Show Password",
    };
  },
  computed: {
    isdisabled() {
      if (this.email.length > 0 && this.password.length > 0) return true;
      else return false;
    },
  },
  methods: {
    showSignup() {
      this.IsSignup = true;
      this.IsLogin = false;
    },
    showLogin() {
      this.IsLogin = true;
      this.IsSignup = false;
    },
    login() {
      const logindata = {
        email: this.email,
        password: this.password,
      };
      if (this.email !== "" && this.password !== "") {
        this.$store
          .dispatch("authentication/updateLogin", logindata)
          .then((res) => {
            this.login.email = null;
            this.login.password = null;
            let user = this.$store.getters["authentication/getUser"];
            if (res.status == 200) {
              if (this.$route.name == "products-id") {
                this.$emit("loggedIn", true);
              } else this.$emit("goFurther");
              let successMessage =
                res.data && res.data.message
                  ? { message: "Logged in successfully.", error: false }
                  : "";
              this.$store.dispatch(
                "notification_alert/updateNotification",
                successMessage
              );
              webengage.user.login(user["_id"]["$oid"]);
              webengage.user.setAttribute("we_email", user["email"]);
              webengage.user.setAttribute("we_first_name", user["first_name"]);
              webengage.user.setAttribute("we_last_name", user["last_name"]);
              webengage.user.setAttribute("we_phone", user["phone"]);
            }
          })
          .catch((err) => {
            let errorMessage;
            if (
              err.response.data &&
              err.response.data.message &&
              err.response.data.error
            ) {
              if (err.response.data.user) {
                errorMessage = {
                  message: "Please verify your email id.",
                  error: true,
                };
              } else {
                errorMessage = {
                  message: err.response.data.message,
                  error: true,
                };
              }
            }
            this.$store.dispatch(
              "notification_alert/updateNotification",
              errorMessage
            );
          });
      } else {
        let errorMessage;
        if (!this.email) {
          errorMessage = {
            message: "Invalid email.",
            error: true,
          };
        } else if (!this.password) {
          errorMessage = {
            message: "Invalid password.",
            error: true,
          };
        } else {
          errorMessage = {
            message: "Please complete the form.",
            error: true,
          };
        }
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
      }
      this.email == "";
      this.password == "";
    },
    facebooklogin() {
      window.location.href = this.fblogintrialurl;
    },
    showPassword() {
      if (this.password.length > 0) {
        let x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
          this.src = "no-views@2x.png";
          this.alt = "Hide Password";
        } else {
          x.type = "password";
          this.src = "views@2x.png";
          this.alt = "Show Password";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.signup {
  background-color: white;
  max-height: 50rem;
  .signupdiv {
    display: flex;
    flex-direction: column;
    nav {
      ul {
        padding: 0rem;
        list-style: none;
        text-align: center;
        display: flex;
        flex-direction: row;
        padding: 0rem 1.5rem;
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
            border-bottom: solid 1px #b4b4b4;
          }
        }
        li:hover,
        li:active,
        .nuxt-link-active {
          button {
            border-bottom: solid 1px black;
            font-weight: bold;
            color: black;
          }
        }
      }
    }
    .signup-types {
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      button {
        width: 45%;
        height: 4.5rem;
        margin: 0.6rem 0.3rem;
        font-size: 1.4rem;
        opacity: 0.7;
        border: solid 1px #646464;
        background-color: #ffffff;
        img {
          height: 1.4rem;
          margin-right: 0.5rem;
        }
      }
    }
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0rem 2rem;
      div {
        height: 0.2rem;

        background-color: white;
        width: 100%;
      }
      h6 {
        font-size: 1.6rem;
        padding: 0.5rem;
        text-align: center;
      }
    }
    form {
      // width: 90%;
      // margin: auto auto;
      position: relative;
      input {
        outline: none;
        margin: 0.5rem auto;
        font-size: 1.6rem;
        width: 100%;
        height: 4.5rem;
        padding-left: 1.7rem;
        border: solid 1px rgba(#8c8c8c, 0.3);
        background-color: white;
        color: #0f0f0f;
        &::placeholder {
          color: $grey-medium;
        }
      }
      input:active,
      input:focus {
        border: solid 1px rgba(#8c8c8c, 0.7);
        background-color: white;
      }
      .view-password-login {
        position: absolute;
        bottom: 55%;
        right: 5%;
        padding: 0;

        img {
          width: 2rem;
        }
      }
      small {
        font-size: 1.4rem;
        color: #646464;
      }
      .signup_button {
        margin-top: 2rem;
        outline: none;
        width: 100%;
        color: #f0f0f0;
        background-color: white;
        border: 1px solid #c8c8c8;
        height: 4.5rem;
        font-size: 1.6rem;
      }
      .signup_button:active,
      .signup_button:hover {
        background-color: rgb(10, 10, 10);
        border: 1px solid rgb(10, 10, 10);
      }
      .inactive {
        margin-top: 2rem;
        outline: none;
        width: 100%;
        color: #f0f0f0;
        background-color: #c8c8c8;
        border: 1px solid #c8c8c8;
        height: 4.5rem;
        font-size: 1.6rem;
        border-radius: 4px;
      }
      .active {
        margin-top: 2rem;
        outline: none;
        width: 100%;
        color: #f0f0f0;
        height: 4.5rem;
        font-size: 1.6rem;
        border-radius: 4px;
        background-color: rgb(10, 10, 10);
        border: 1px solid rgb(10, 10, 10);
      }
    }
    .terms_conditions {
      font-size: 1.4rem;
      color: #8c8c8c;
      margin-top: 1rem;
      a {
        color: inherit;
        font-weight: 600;
        text-decoration: none;
      }
    }
  }
}
.forgotpassword {
  display: block;
  background-color: transparent;
  border: none;
  margin: 0.7rem 0;
  margin-left: auto;
  font-size: 1.4rem;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  font-weight: normal;
  letter-spacing: normal;
  text-align: left;
  color: #646464;
  padding: 0;

  &:hover,
  &:active {
    font-weight: 600;
  }
}
</style>
