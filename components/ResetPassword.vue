<template>
  <form
    class="reset_container"
    @submit.prevent.stop="resetPassword"
    v-if="!signUpAck"
  >
    <h3 class="reset_container--heading">Reset Password</h3>
    <p class="reset_container--text">
      Please enter the email address that is associated with your SoleSearch
      account.
    </p>
    <input
      class="reset_container--input"
      type="email"
      name="email"
      id="email"
      placeholder="Email Address"
      v-model="email"
    />
    <button type="submit" :class="isdisabled == true ? 'active' : 'inactive'">
      Reset Password
    </button>
    <button
      class="reset_container--goBack"
      type="button"
      @click="$emit('reset', false)"
    >
      Go Back
    </button>
  </form>
  <signupack
    class="ack"
    :heading="heading"
    :description="description"
    :msg="msg"
    :href="href"
    :src="src"
    @buyerSignedUp="buyerSignedUp"
    @hideNav="hideNav"
    v-else
  />
</template>

<script>
import axios from "axios";
import signupack from "@/components/signupack.vue";

export default {
  data() {
    return {
      email: "",
      signUpAck: false,
      description:
        "If there is an account associated with the provided email address, then you will receive an email with a link to reset your password.",
      heading: "Reset Password Email Sent!",
      src: "email@2x.png"
    };
  },
  comments: {
    signupack
  },
  props: {
    msg: {
      type: String,
      default: "Continue Shopping"
    },
    href: {
      type: String,
      default: "/login"
    }
  },
  computed: {
    validateEmail() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    isdisabled() {
      if (this.email && this.validateEmail) return true;
      else return false;
    }
  },
  methods: {
    resetPassword() {
      if (this.email !== "" && this.validateEmail) {
        axios
          .post("/send-verification-link", { email: this.email, reset: true })
          .then(res => {
            if (res.status == 200) {
              this.signUpAck = true;
              let successMessage =
                res.data && res.data.message
                  ? { message: res.data.message, error: false }
                  : { message: "Email sent successfully.", error: false };
              this.$store.dispatch(
                "notification_alert/updateNotification",
                successMessage
              );
            }
          })
          .catch(err => {
            let errorMesssage =
              err.response.data &&
              err.response.data.message &&
              err.response.data.error
                ? {
                    message: "Invalid email id.",
                    error: true
                  }
                : {
                    message: "Invalid email id.",
                    error: true
                  };
            this.$store.dispatch(
              "notification_alert/updateNotification",
              errorMesssage
            );
          });
      } else {
        let errorMessage = {
          message: "Invalid email id.",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
      }
    },
    buyerSignedUp(value) {
      this.$emit("emailSent", value);
    }
  }
};
</script>
<style lang="scss" scoped>
.reset_container {
  min-height: 40rem;
  display: flex;
  flex-direction: column;

  &--heading {
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
  &--text {
    margin: 4.1rem 0 3.1rem;
    font-size: 1.6rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #646464;
  }

  &--input {
    outline: none;
    margin: 0.5rem auto;
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
    &:active,
    &:focus {
      border: solid 1px rgba(#8c8c8c, 0.7);
      background-color: rgba(#ffffff, 0.7);
    }
  }
  &--resetButton {
    margin-top: 0.5rem;
    outline: none;
    width: 100%;
    color: #f0f0f0;
    background-color: #c8c8c8;
    border: 1px solid #c8c8c8;
    height: 4rem;
    font-size: 1.6rem;

    &:hover,
    &:active {
      background-color: blue;
      border: 1px solid blue;
    }
  }
  .inactive {
    margin-top: 2rem;
    outline: none;
    width: 100%;
    color: #f0f0f0;
    background-color: #c8c8c8;
    border: 1px solid #c8c8c8;
    height: 4rem;
    font-size: 1.6rem;
  }
  .active {
    margin-top: 2rem;
    outline: none;
    width: 100%;
    color: #f0f0f0;
    height: 4rem;
    font-size: 1.6rem;
    background-color: blue;
    border: 1px solid blue;
  }

  &--goBack {
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
}
</style>
