<template>
  <div class="name-form">
    <div class="name-form__container">
      <label class="name-form__label" for="first-name">First Name</label>
      <input
        class="name-form__input"
        type="text"
        id="first-name"
        placeholder="First Name"
        v-model="userData.first_name"
        @keypress="nameValidation"
      />
    </div>
    <div class="name-form__container">
      <label class="name-form__label" for="last-name">Last Name</label>
      <input
        class="name-form__input"
        type="text"
        id="last-name"
        placeholder="Last Name"
        v-model="userData.last_name"
        @keypress="nameValidation"
      />
    </div>
    <button @click="onSave" class=" black-button">
      Save Changes
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // userData: {
      //   first_name: "",
      //   last_name: "",
      // },
    };
  },
  async asyncData(context) {
    const user = await axios.get("/user-update", {
      headers: {
        Authorization:
          "Bearer " + context.store.getters["authentication/idToken"]
      }
    });
    let userData = {};
    userData.first_name =
      user.data.user.first_name.charAt(0).toUpperCase() +
      user.data.user.first_name.slice(1).toLowerCase();
    userData.last_name =
      user.data.user.last_name.charAt(0).toUpperCase() +
      user.data.user.last_name.slice(1).toLowerCase();
    return { userData: userData };
  },
  computed: {
    // user() {
    //   return this.$store.getters["authentication/getUser"];
    // },
    token() {
      return this.$store.getters["authentication/idToken"];
    }
  },
  methods: {
    onSave() {
      if (!this.userData.first_name) {
        let errorMessage = {
          message: "First name can't be empty",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        return;
      }
      if (!this.userData.last_name) {
        let errorMessage = {
          message: "Last name can't be empty",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        return;
      }
      //update user name
      axios
        .put("/user-update", this.userData, {
          headers: { Authorization: "Bearer " + this.token }
        })
        .then(res => {
          let successMessage =
            res.data && res.data.message
              ? res.data
              : { message: "User updated successfully.", error: false };
          this.$store.dispatch(
            "notification_alert/updateNotification",
            successMessage
          );
          this.$store.commit("authentication/updateUser", {
            user: res.data.user
          });
          this.$router.push("/seller/profile");
        })
        .catch(err => {
          console.log(err);
          let errorMessage =
            err.response.data &&
            err.response.data.message &&
            err.response.data.error
              ? err.response.data
              : { message: "Something went wrong", error: true };
          this.$store.dispatch(
            "notification_alert/updateNotification",
            errorMessage
          );
        });
    },
    nameValidation(evt) {
      if (
        (evt.keyCode > 64 && evt.keyCode < 91) ||
        (evt.keyCode > 96 && evt.keyCode < 123)
      ) {
        return true;
      } else {
        evt.preventDefault();
      }
    }
  }
  // created() {
  //   this.userData.first_name =
  //     this.user.first_name.charAt(0).toUpperCase() +
  //     this.user.first_name.slice(1).toLowerCase();
  //   this.userData.last_name =
  //     this.user.last_name.charAt(0).toUpperCase() +
  //     this.user.last_name.slice(1).toLowerCase();
  // },
};
</script>

<style lang="scss" scoped>
.name-form {
  width: 30%;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  @media screen and (max-width: 1370px) {
    width: 45%;
  }
  @media screen and (max-width: 992px) {
    width: 60%;
  }
  @media screen and (max-width: 767px) {
    width: 80%;
  }
  @media screen and (max-width: 575px) {
    width: 85%;
  }
  &__heading {
    color: $primary;
    font-size: 2rem;
    margin-bottom: 2.5rem;
    font-weight: bold;
    @media screen and (max-width: 575px) {
      font-size: 1.8rem;
    }
  }

  &__container {
    // display: flex;
    // flex-direction: column;
    width: 100%;
    margin-bottom: 1.9rem;
  }

  &__label {
    font-size: 1.4rem;
    color: $primary;
    text-transform: uppercase;
    display: block;
    text-align: left;

    @media screen and (max-width: 575px) {
      font-size: 1.3rem;
    }
  }
  &__input {
    max-height: 5rem;
    padding: 1.9rem;
    border: none;
    border: solid 1px rgba($grey-dark, 0.6);
    background-color: rgba($base-white, 0.6);
    font-size: 1.6rem;
    color: $primary;
    width: 100%;
    @media screen and (max-width: 575px) {
      padding: 1.3rem;
    }

    &-error {
      color: #ff5a5a;
      text-align: left;
      margin: 0.5rem 0;
      font-size: 1.2rem;
    }
  }

  &__info-text {
    color: $primary;
    font-size: 1.6rem;
    margin-bottom: 3.9rem;
    margin-top: 2.8rem;
    @media screen and (max-width: 575px) {
      font-size: 1.4rem;
      text-align: left;
    }
  }

  &__button {
    max-height: 5rem;
    font-size: 1.85rem;
    color: $base-white;
    font-weight: bold;
    width: 100%;
    border: solid 1px $primary;
    background-color: $button-dark;
    padding: 1.4rem;

    @media screen and (max-width: 575px) {
      font-size: 1.6rem;
    }
    &:disabled,
    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
