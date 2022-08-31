<template>
  <div>
    <Header />
    <TheSideNav />
    <div class="wrapper d-flex justify-content-center ">
      <div class="signup">
        <div class="signupdiv">
          <h3 class="heading">Reset Password</h3>
          <form @submit.prevent.stop="setPassword">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              v-model="newPassword.password"
              @focus="error = false"
            />
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm Password"
              v-model="newPassword.confirm_password"
              @focus="error = false"
            />
            <small v-if="error" class="error-notification"
              >At least 8 characters, 1 uppercase letter, 1 number & 1
              symbol</small
            >
            <button type="submit" class="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      newPassword: {
        password: "",
        confirm_password: ""
      },
      error: false
    };
  },
  methods: {
    setPassword() {
      let regex = /(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[-!$%^&*()@~#_+|~=`{}\[\]:";'<>?,.\/])(?=.*[^A-Za-z0-9]).*/;
      if (
        !this.newPassword.confirm_password ||
        !this.newPassword.password ||
        this.newPassword.confirm_password !== this.newPassword.password
      ) {
        let errorMessage = {
          message: "Password did not match",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        return;
      }
      if (!this.newPassword.password.match(regex)) {
        this.error = true;
        return;
      }
      let userDetails = {};
      let token = this.$route.params.token;
      userDetails.password = this.newPassword.password;
      this.$store
        .dispatch("authentication/changePassword", {
          userDetails,
          token
        })
        .then(this.$router.replace("/"));
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: $grey-light;
  margin-top: 0rem !important;
  padding-top: 3rem;
}
.heading {
  margin-top: 5rem;
  font-size: 2rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #646464;
}
.signup {
  background-color: $base-grey;
  min-height: 40rem;
  max-width: 48rem;
  padding: 4rem;
  display: flex;
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
            border-bottom: solid 1px #646464;
            font-weight: bold;
            color: #646464;
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
        height: 4rem;
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

        background-color: #b4b4b4;
        width: 100%;
      }
      h6 {
        font-size: 1.6rem;
        padding: 0.5rem;
        text-align: center;
      }
    }
    form {
      width: 90%;
      margin: auto auto;
      input {
        outline: none;
        margin: 1rem auto;
        font-size: 1.6rem;
        width: 100%;
        height: 4.5rem;
        padding-left: 1.7rem;
        border: solid 1px rgba(#8c8c8c, 0.3);
        background-color: rgba(#ffffff, 0.3);
        color: $grey-medium;
        &::placeholder {
          color: $grey-medium;
        }
      }
      input:active,
      input:focus {
        border: solid 1px rgba(#8c8c8c, 0.7);
        background-color: rgba(#ffffff, 0.7);
      }
      small {
        font-size: 1.4rem;
        color: #646464;
      }

      .submit {
        margin-top: 2rem;
        outline: none;
        width: 100%;
        color: #f0f0f0;
        height: 4rem;
        font-size: 1.6rem;
        background-color: blue;
        border: 1px solid blue;
      }
    }
  }
}

.error-notification {
  margin-top: 1rem;
  font-size: 1.2rem !important;
  color: #ff5a5a !important;
  font-weight: 600;
}
</style>
