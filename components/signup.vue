<template>
  <div>
    <div class="signup" v-if="signup">
      <div class="signupdiv">
        <form @submit.prevent.stop="registration">
          <input
            type="text"
            required
            name="firstname"
            id="firstname"
            placeholder="First Name"
            v-model="firstname"
          />
          <input
            type="text"
            required
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            v-model="lastname"
          />
          <input
            type="email"
            name="email"
            required
            id="email"
            placeholder="Email Address"
            v-model="email"
          />
          <input
            type="text"
            name="phone"
            required
            id="phone"
            placeholder="Phone Number"
            v-model="phone"
          />
          <input
            type="text"
            name="instagram"
            id="instagram"
            placeholder="Instagram Username"
            v-model="instagram"
          />
          <div style="position: relative">
            <input
              type="password"
              name="password"
              required
              id="password"
              placeholder="Password"
              v-model="password"
            />
            <span class="view-password" @click="showPassword"
              ><img :src="require(`../assets/images/views/${src}`)" :alt="alt"
            /></span>
          </div>
          <small>At least 8 characters</small>
          <div class="form-check-wrapper">
            <input
              type="checkbox"
              class="form-check-input"
              id="terms_condtions"
              v-model="terms_condtions"
            />
            <label class="form-check-label" for="terms_condtions">
              By signing up, you agree to the
              <a href=""> Terms of Service</a> and
              <a href="">Privacy Policy</a>
            </label>
          </div>
          <button
            type="submit"
            :class="isdisabled == true ? 'active' : 'inactive'"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
    <signupack
      class="ack"
      :heading="heading"
      :description="description"
      :msg="msg"
      :href="href"
      @buyerSignedUp="buyerSignedUp"
      @hideNav="hideNav"
      v-else
    />
  </div>
</template>

<script>
import axios from "axios";
import login from "@/components/login.vue";
import signupack from "@/components/signupack.vue";
export default {
  name: "signup",
  components: {
    login,
    signupack,
  },
  data() {
    return {
      description: "Thanks for registration.",
      msg: "See other products",
      href: "/products",
      heading: "Thank You",
      trialurl:
        "https://www.facebook.com/v9.0/dialog/oauth?client_id=1101288090321392&redirect_uri=https://www.dryp.in/callback&state=facebook&display=popup&response_type=token&scope=email",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      instagram: "",
      terms_condtions: false,
      IsSignup: true,
      IsLogin: false,
      isAllInputFilled: "inactive",
      signup: true,
      src: "views@2x.png",
      alt: "Show Password",
    };
  },
  props: {
    msg: {
      type: String,
      default: "See other products",
    },
    href: {
      type: String,
      default: "/products",
    },
  },
  computed: {
    validateEmail() {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // this.error.email.touch = true;

      // if (!this.email) {
      //   // this.error.email.required = true;
      //   return false;
      // }
      if (re.test(String(this.email).toLowerCase())) {
        // this.error.email.required = false;
        return true;
      } else {
        // this.error.email.required = false;
        // this.error.email.invalid = true;
        return false;
      }
    },
    validatePhoneNumber() {
      const re = /^\d{10}$/;
      if (re.test(this.phone)) {
        return true;
      }
      return false;
    },
    isdisabled() {
      let regex =
        /(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[-!$%^&*()@~#_+|~=`{}\[\]:";'<>?,.\/])(?=.*[^A-Za-z0-9]).*/;
      if (
        this.firstname &&
        this.lastname &&
        this.email &&
        this.validateEmail &&
        this.password.length >= 8 &&
        this.validatePhoneNumber &&
        this.terms_condtions
      )
        return true;
      else return false;
    },
  },
  methods: {
    showLogin() {
      this.IsLogin = true;
      this.IsSignup = false;
    },
    showSignup() {
      this.IsSignup = true;
      this.IsLogin = false;
    },
    buyerSignedUp(value) {
      this.$emit("buyerSignedUp", value);
    },
    hideNav(value) {
      this.$emit("hideNav", value);
    },
    registration() {
      let errorMessage;
      const signupdata = {
        first_name: this.firstname,
        last_name: this.lastname,
        email: this.email,
        password: this.password,
        phone: this.phone,
        instagram: this.instagram,
      };

      let regex =
        /(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[-!$%^&*()@~#_+|~=`{}\[\]:";'<>?,.\/])(?=.*[^A-Za-z0-9]).*/;
      if (
        this.firstname !== "" &&
        this.lastname !== "" &&
        this.email !== "" &&
        this.validateEmail &&
        this.password.length >= 8 &&
        this.validatePhoneNumber &&
        this.terms_condtions === true
      ) {
        axios
          .post("/register", signupdata)
          .then((res) => {
            (this.firstname = ""),
              (this.lastname = ""),
              (this.email = ""),
              (this.password = ""),
              (this.phone = ""),
              (this.instagram = ""),
              (this.terms_condtions = false);
            if (res.status === 200) {
              this.signup = false;
              this.$emit("signedup", this.signup);

              this.$bvModal.msgBoxOk(
                "A Verification Email has been sent to your Email ID.",
                {
                  title: false,
                  size: "sm",
                  buttonSize: "lg",
                  okVariant: "success",
                  bodyClass: "modal-text",
                  footerClass: "p-2 border-top-0",
                  centered: true,
                }
              );

              let successMessage =
                res.data && res.data.message
                  ? { message: "Registered successfully.", error: false }
                  : { message: "Registered successfully.", error: false };
              this.$store.dispatch(
                "notification_alert/updateNotification",
                successMessage
              );
            }
          })
          .catch((err) => {
            errorMessage =
              err.response.data &&
              err.response.data.message &&
              err.response.data.error
                ? {
                    message: "Email id already exists.",
                    error: true,
                  }
                : {
                    message: "Email id already exists.",
                    error: true,
                  };
            this.$store.dispatch(
              "notification_alert/updateNotification",
              errorMessage
            );
          });
      } else {
        if (!this.firstname) {
          errorMessage = { message: "First name can't be empty.", error: true };
        } else if (!this.lastname) {
          errorMessage = { message: "Last name can't be empty.", error: true };
        } else if (!this.validateEmail || !this.email) {
          errorMessage = {
            message: "Invalid Email.",
            error: true,
          };
        } else if (!this.validatePhoneNumber || !this.phone) {
          errorMessage = {
            message: "Phone number should be 10 digits.",
            error: true,
          };
        } else if (!this.password.match(regex)) {
          errorMessage = { message: "Invalid password.", error: true };
        } else if (!this.terms_condtions) {
          errorMessage = {
            message: "Please accept privacy policy.",
            error: true,
          };
        } else {
          errorMessage = { message: "Please complete the form.", error: true };
        }
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
      }
    },
    facebooksignup() {
      window.location.href = this.trialurl;
      // let redirect_uri="https://www.dryp.in/callback"
      // "https://www.facebook.com/v9.0/dialog/oauth?client_id=1101288090321392&redirect_uri=+redirect_uri+"+redirect_uri+"&state=facebook&display=popup&response_type=token&scope=email"
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
  // min-height: 50rem;
  max-width: 40rem;
  margin: 0 auto;
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
            border-bottom: solid 1px rgb(19, 19, 21);
            font-weight: bold;
            color: rgb(19, 19, 21);
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
        border: solid 1px rgb(19, 19, 21);
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
        width: 100%;
        background-color: white;
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
        padding: 0.5rem;
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
        background-color: rgba(#ffffff, 0.7);
      }
      .view-password {
        position: absolute;
        bottom: 47%;
        right: 5%;
        padding: 0;
        @media screen and (max-width: 431px) {
          bottom: 49%;
        }
        img {
          width: 2rem;
        }
      }
      small {
        font-size: 1.2rem;
        color: rgb(19, 19, 21);
        font-weight: 600;
      }
      .form-check-input {
        height: 1.5rem;
        width: 1.5rem;
        margin: 0.3rem 0;
        margin-right: 1rem;
      }
      label {
        margin-left: 2rem;
        font-size: 1.4rem;
        color: rgb(19, 19, 21);
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
        background-color: rgb(10, 10, 10);
        border: 1px solid rgb(10, 10, 10);
        border-radius: 4px;
      }
    }
  }
}
.ack {
  width: 100vw;
}
.form-check-wrapper {
  margin-top: 3rem;
}
.form-check-label a,
.form-check-label a:hover,
.form-check-label a:visited {
  color: rgb(19, 19, 21);
  font-weight: 600;
  text-decoration: none;
}
</style>
