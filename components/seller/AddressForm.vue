<template>
  <div class="address-form">
    <h3 class="address-form__heading">
      {{ !address ? "Fill New Address" : "Edit Profile Info" }}
    </h3>
    <div class="address-form__container">
      <label class="address-form__label required" for="first-name"
        >First Name</label
      >
      <input
        class="address-form__input required"
        type="text"
        id="first-name"
        placeholder="First Name"
        v-model="newAddress.first_name"
        @keypress="nameValidation"
      />
    </div>
    <div class="address-form__container ">
      <label class="address-form__label required" for="last-name"
        >Last Name</label
      >
      <input
        class="address-form__input"
        type="text"
        id="last-name"
        placeholder="Last Name"
        v-model="newAddress.last_name"
        @keypress="nameValidation"
      />
    </div>
    <div class="address-form__container ">
      <label class="address-form__label required" for="email"
        >Email Address</label
      >
      <input
        class="address-form__input"
        type="email"
        id="email"
        placeholder="Email Address"
        v-model="newAddress.email"
        @blur="validateEmail"
      />
    </div>
    <div class="address-form__container">
      <label class="address-form__label required" for="phone"
        >Phone number</label
      >
      <input
        class="address-form__input"
        type="text"
        id="phone"
        placeholder="Phone number*"
        v-model="newAddress.phone_number"
        autocomplete="off"
        @keypress="phoneValidation"
      />
    </div>
    <div style="display:flex;">
      <div class="address-form__container mr-3">
        <label class="address-form__label required" for="building"
          >Building Name</label
        >
        <input
          class="address-form__input"
          type="text"
          id="building"
          placeholder="Building name"
          v-model="newAddress.building_name"
          @keypress="validateAlphaNumericString"
        />
      </div>
      <div class="address-form__container">
        <label class="address-form__label required" for="flat"
          >House / flat number</label
        >
        <input
          class="address-form__input"
          type="text"
          id="flat"
          placeholder="House / flat number"
          v-model="newAddress.house_flat_number"
          @keypress="validateAlphaNumericString"
        />
      </div>
    </div>
    <div class="address-form__container">
      <label class="address-form__label required" for="street"
        >Street Name</label
      >
      <input
        class="address-form__input"
        type="text"
        id="street"
        placeholder="Street Name"
        v-model="newAddress.street_name"
        @keypress="validateAlphaNumericString"
      />
    </div>
    <div class="address-form__container">
      <label class="address-form__label" for="landmark">Landmark</label>
      <input
        class="address-form__input"
        type="text"
        id="landmark"
        placeholder="Landmark"
        v-model="newAddress.landmark"
        @keypress="validateAlphaNumericString"
      />
    </div>
    <div style="display:flex;">
      <div class="address-form__container mr-3">
        <label class="address-form__label required" for="city"
          >City / village</label
        >
        <input
          class="address-form__input"
          type="text"
          id="city"
          placeholder="City / village"
          v-model="newAddress.city_village"
          @keypress="stringValidate"
        />
      </div>
      <div class="address-form__container">
        <label class="address-form__label required" for="state"
          >State / Region</label
        >
        <input
          class="address-form__input"
          type="text"
          id="state"
          placeholder="State / Region"
          v-model="newAddress.state"
          @keypress="stringValidate"
        />
      </div>
    </div>
    <div style="display:flex;">
      <div class="address-form__container mr-3 mb-0">
        <label class="address-form__label required" for="country"
          >Country</label
        >
        <input
          class="address-form__input"
          type="text"
          id="country"
          placeholder="Country"
          v-model="newAddress.country"
          @keypress="stringValidate"
        />
      </div>
      <div class="address-form__container mb-0">
        <label class="address-form__label required" for="post"
          >Zip / Postal Code</label
        >
        <input
          class="address-form__input"
          type="text"
          id="post"
          placeholder="Zip / Postal Code"
          v-model="newAddress.zip"
          @keypress="numberValidation"
        />
      </div>
    </div>
    <p class="address-form__info-text">
      Your shipping and payment address must match to ensure a safe transaction
      for yourself and the seller.
    </p>
    <button class="black-button" style="max-width:100%" @click="onSave">
      {{ !address ? "Done" : "Save Changes" }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      newAddress: this.address
        ? { ...this.address }
        : {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            building_name: "",
            house_flat_number: "",
            street_name: "",
            landmark: "",
            city_village: "",
            state: "",
            country: "",
            zip: ""
          },
      invalidEmail: false
    };
  },
  methods: {
    onSave() {
      if (!this.newAddress.first_name) {
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
      if (!this.newAddress.last_name) {
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
      if (!this.newAddress.email) {
        let errorMessage = {
          message: "Email name can't be empty",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        return;
      }
      if (!this.newAddress.phone_number) {
        let errorMessage = {
          message: "Phone Number can't be empty",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        return;
      }
      if (!this.newAddress.building_name) {
        let errorMessage = {
          message: "Building name can't be empty",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        return;
      }
      if (!this.newAddress.house_flat_number) {
        let errorMessage = {
          message: "House/Flat number can't be empty",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        return;
      }
      if (!this.newAddress.street_name) {
        let errorMessage = {
          message: "Street Name can't be empty",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        return;
      }
      if (!this.newAddress.city_village) {
        let errorMessage = {
          message: "City/Village can't be empty",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        return;
      }
      if (!this.newAddress.state) {
        let errorMessage = {
          message: "State/Region can't be empty",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        return;
      }
      if (!this.newAddress.country) {
        let errorMessage = {
          message: "Country can't be empty",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        return;
      }
      if (!this.newAddress.zip) {
        let errorMessage = {
          message: "Zip/Postal Code can't be empty",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        return;
      }
      if (this.invalidEmail) {
        let errorMessage = {
          message: "Email is inavlid",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        return;
      }
      this.$emit("submit", this.newAddress);
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
    },
    validateEmail() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!this.newAddress.email) {
        return;
      }
      if (re.test(String(this.newAddress.email).toLowerCase())) {
        this.invalidEmail = false;
        return true;
      } else {
        let errorMessage = {
          message: "Email is not valid",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        this.invalidEmail = true;
        return;
      }
    },
    phoneValidation(evt) {
      if (
        this.newAddress.phone_number === undefined ||
        (this.newAddress.phone_number.length < 10 &&
        evt.keyCode >= 48 &&
        evt.keyCode <= 90)
      ) {
        return true;
      } else {
        evt.preventDefault();
      }
    },
    validateAlphaNumericString(e) {
      return true;
    },
    stringValidate(evt) {
      if (
        (evt.keyCode > 64 && evt.keyCode < 91) ||
        (evt.keyCode > 96 && evt.keyCode < 123) ||
        evt.keyCode == 32
      ) {
        return true;
      } else {
        evt.preventDefault();
      }
    },
    numberValidation(evt) {
      if (evt.keyCode >= 48 && evt.keyCode <= 90) {
        return true;
      } else {
        evt.preventDefault();
      }
    }
  },
  watch: {
    "newAddress.phone_number"(newValue, oldValue) {
      if (newValue && newValue.length > 10) {
        let errorMessage = {
          message: "Can't be more than 10 digits",
          error: true
        };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
        this.newAddress.phone_number = "";
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.required:after {
  content: " *";
  color: red;
}

.address-form {
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
