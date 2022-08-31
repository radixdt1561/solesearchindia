<template>
  <div class="profile_info">
    <div>
      <h3 class="shipping_info">User Info</h3>
      <div class="personal-details__wrapper">
        <div class="personal-details">
          <p class="personal-details__text">
            <span class="personal-details__text--field">Full Name:</span>
            <span
              class="personal-details__text--value"
              style="text-transform: capitalize"
              >{{user &&
                user.first_name.charAt(0).toUpperCase() +
                user.first_name.slice(1).toLowerCase() +
                " " +
                user.last_name.charAt(0).toUpperCase() +
                user.last_name.slice(1).toLowerCase()
              }}</span
            >
          </p>
          <!-- <p class="personal-details__text">
          <span class="personal-details__text--field">Mobile Number:</span>
          <span class="personal-details__text--value"
            >+91 {{ userInfo.phone_number }}</span
          >
        </p> -->
          <p class="personal-details__text">
            <span class="personal-details__text--field">Email ID:</span>
            <span
              class="personal-details__text--value"
              style="text-transform: lowercase"
              >{{user && user.email }}</span
            >
          </p>
        </div>
        <div class="personal-details__actions">
          <button
            class="personal-details__text--button default_address__actions--button edit-icon"
            @click="editName(user.email)"
          >
            <img src="~/assets/images/edit-pen/edit@2x.png" alt="edit-icon" />
          </button>
        </div>
      </div>
    </div>
    <h3 class="shipping_info mt-5">Default Address</h3>
    <div v-if="addresses && addresses.length !== 0">
      <div
        class="default_address"
        v-for="(address, index) in addresses"
        :key="address.unique_id"
      >
        <label class="default_address__label--wrapper" :for="index">
          <div class="default_address__text-wrapper">
            <p class="default_address__label--details">
              <span class="default_address__label--first-name">{{
                address.first_name
              }}</span>
              <span class="default_address__label--last-name">{{
                address.last_name
              }}</span>
            </p>
            <p class="default_address__label--details">
              <span class="default_address__label--flat"
                >{{ address.building_name }},</span
              >
              <span class="default_address__label--building">
                {{ address.house_flat_number }},
              </span>
            </p>
            <p class="default_address__label--details">
              {{ address.street_name }},
            </p>
            <p class="default_address__label--details" v-if="address.landmark">
              {{ address.landmark }},
            </p>
            <p class="default_address__label--details">
              <span class="default_address__label--city"
                >{{ address.city_village }},
              </span>
              <span class="default_address__label--state"
                >{{ address.state }},</span
              >
            </p>
            <p class="default_address__label--details">
              {{ address.zip }}
            </p>
            <p class="default_address__label--details">
              Phone Number: +91 {{ address.phone_number }}
            </p>
          </div>
          <div class="default_address__actions">
            <button
              class="default_address__actions--button"
              @click="deleteAddress(address.unique_id)"
            >
              <img
                src="~/assets/images/delete-icon/delete-icon@2x.png"
                alt="delete-icon"
              />
            </button>
            <button
              class="default_address__actions--button edit-icon"
              @click="editAddress(address.unique_id)"
            >
              <img src="~/assets/images/edit-pen/edit@2x.png" alt="edit-icon" />
            </button>
          </div>
          <input
            type="radio"
            name="default_address"
            :id="index"
            :value="address.unique_id"
            class="default_address__input"
            :checked="address.default_address"
            @change="selectDefaultAddress(address.unique_id)"
          />
          <div class="default_address__custom--indicator"></div>
        </label>
      </div>
    </div>
    <h5 v-else class="shipping_info no_address mt-5">
      Add your home and office addresses and enjoy faster checkout
    </h5>
    <button
      @click="$router.push('/seller/profile/address/add')"
      class="profile_info__action profile_info__action--add"
    >
      <div class="profile_info__action--icon">
        <img
          src="~/assets/images/plus-add-icon/plus-add-icon@2x.png"
          alt="plus-icon"
        />
      </div>
      Add a new address
    </button>

    <!-- Below code not required now  -->
    <!-- <button class="profile_info__action profile_info__action--edit">
      Edit Profile Details
    </button> -->
  </div>
</template>

<script>
export default {
  props: {
    addresses: {
      type: Array,
      required: false,
    },
    selectDefaultAddress: {
      type: Function,
      required: true,
    },
    userInfo: {
      type: Object,
      required: false,
      default() {
        return null;
      },
    },
    user: {
      type: Object,
      required: false,
      default() {
        return null;
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    // user() {
    //   return this.$store.getters["authentication/getUser"];
    // },
  },
  methods: {
    deleteAddress(unique_id) {
      this.$emit("deleteAction", unique_id);
    },
    editAddress(unique_id) {
      this.$emit("editAction", unique_id);
    },
    editName() {
      this.$emit("editName");
    },
  },
};
</script>

<style lang="scss" scoped>
$radio-button-container-size: 2rem;
$radio-button-fill-size: 1.2rem;
.profile_info {
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

  &__action {
    width: 100%;
    padding: 1.4rem;
    max-height: 5rem;
    border: none;
    @media screen and (max-width: 575px) {
      padding-left: 0.7rem;
    }

    &--add {
      background-color: rgba($base-white, 0.6);
      color: $primary;
      display: flex;
      text-align: center;
      font-size: 1.6rem;

      @media screen and (max-width: 575px) {
        font-size: 1.4rem;
      }
    }

    &--edit {
      background-color: $button-dark;
      color: $base-white;
      font-weight: bold;
      margin-top: 1rem;
      text-align: center;
      font-size: 1.85rem;
      @media screen and (max-width: 575px) {
        font-size: 1.6rem;
      }
    }

    &--icon {
      height: 1.6rem;
      width: 1.6rem;
      margin-right: 1.5rem;
      margin-top: -2px;
      @media screen and (max-width: 575px) {
        margin-right: 0.5rem;
      }
    }

    & img {
      width: 100%;
      max-width: 1.6rem;
      height: auto;
      backface-visibility: hidden;
    }
  }
}
.shipping_info {
  color: $primary;
  font-size: 2rem;
  margin-bottom: 2.5rem;
  font-weight: bold;
  @media screen and (max-width: 575px) {
    font-size: 1.8rem;
  }
}
.personal-details__wrapper {
  display: flex;
  justify-content: space-between;
  background-color: rgba($base-white, 0.6);
  padding: 4rem 4.5rem;
  @media screen and (max-width: 575px) {
    padding: 3rem 3rem;
  }
}
.personal-details {
  flex-grow: 2;
  &__text {
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    @media screen and (max-width: 575px) {
      font-size: 1.4rem;
    }
    &--field {
      color: $primary;
    }
    &--value {
      color: $primary;
      font-weight: bold;
    }
    &--button {
      margin-left: 2rem;
      @media screen and (max-width: 395px) {
        margin-left: 1rem;
      }
    }
  }
}
.default_address {
  background-color: rgba($base-white, 0.6);
  padding: 2rem 4.5rem;
  margin-bottom: 1rem;
  @media screen and (max-width: 575px) {
    padding: 2rem 2rem;
  }

  &__container {
  }
  &__text-wrapper {
    flex: 1;
  }
  &__label {
    &--wrapper {
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      position: relative;
      top: 0.25rem;

      @media screen and (max-width: 767px) {
        margin-left: 1rem;
      }

      &:hover .default_address__input ~ .default_address__custom--indicator {
        border-color: $light-green;
      }
    }
    &--details {
      text-align: left;
      color: $primary;
      font-size: 1.6rem;
      margin-bottom: 0;
      font-weight: 500;
      @media screen and (max-width: 575px) {
        font-size: 1.4rem;
      }
    }
  }
  &__input {
    opacity: 0;
    position: absolute;
    z-index: -1;

    &:focus ~ .default_address__custom--indicator {
      border-color: $light-green;
    }

    &:checked ~ .default_address__custom--indicator {
      &::after {
        display: block;
      }
    }

    &:disabled ~ .default_address__custom--indicator {
      opacity: 0.6;
      pointer-events: none;
    }
  }
  &__custom--indicator {
    background-color: white;
    border: 3px solid $light-green;
    border-radius: 50%;
    height: $radio-button-container-size;
    left: -3.6rem;
    position: absolute;
    top: 0.3rem;
    width: $radio-button-container-size;

    @media screen and (max-width: 767px) {
      left: -2.6rem;
      height: 1.8rem;
      width: 1.8rem;
    }

    &::after {
      background-color: $light-green;
      border-radius: 50%;
      content: "";
      display: none;
      height: $radio-button-fill-size;
      position: absolute;
      width: $radio-button-fill-size;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      @media screen and (max-width: 767px) {
        height: 1rem;
        width: 1rem;
      }
    }
  }
  &__actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &--button {
      background-color: transparent;
      border: none;
      width: 2.3rem;
      height: 2.8rem;
      padding: 0;

      & img {
        width: 100%;
        max-width: 2.3rem;
        height: auto;
        backface-visibility: hidden;
        @media screen and (max-width: 575px) {
          max-width: 1.8rem;
        }
      }
    }
  }
}
.no_address {
  font-size: 1.5rem;
}
</style>
