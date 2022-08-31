<template>
  <div>
    <div class="components__wrapper" v-if="!paymentInfo">
      <h3>Shipping Info</h3>
      <address-form
        ref="addressForm"
        @submit="onSubmit"
        :address="address"
        v-if="addresses.length == 0 || addressForm"
      />
      <div class="profile-info__wrapper" v-else>
        <button
          @click="
            addressForm = true;
            address = {};
          "
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
        <ProfileInfo
          :addresses="addresses"
          @deleteAction="deleteAddress"
          :selectDefaultAddress="selectDefaultAddress"
          @editAction="editAddress"
        />
        <!-- <button
        class="default_address__actions--button edit-icon"
        @click="editAddress(addresses.unique_id)"
      >
        <img src="~/assets/images/edit-pen/edit@2x.png" alt="edit-icon" />
      </button> -->
      </div>
    </div>
    <paymentInfo @payBtn="payBtn" v-else />
  </div>
</template>

<script>
import axios from "axios";
import AddressForm from "@/components/seller/AddressForm.vue";
import paymentInfo from "@/components/buyer/paymentInfo.vue";
import ProfileInfo from "@/components/seller/ProfileInfo";

export default {
  data() {
    return {
      userInfo: {},
      addressForm: false,
      address: {},
      paymentInfo: false
    };
  },

  components: {
    AddressForm,
    paymentInfo,
    ProfileInfo
  },
  watch: {
    addressForm: function(value) {
      this.$emit("showAddressForm", value);
    },
    addresses: function(value) {
      this.$emit("showAddressForm", value.length === 0);
    }
  },
  async mounted() {
    if (this.addresses.length === 0) {
      try {
        let result = await axios.get("/add-user-info", {
          headers: {
            Authorization: "Bearer " + this.token
          }
        });
        this.$store.dispatch("address/updateAddress", result.data.address);
      } catch (err) {
        this.$store.dispatch("notification_alert/updateNotification", {
          message: "Cannot fetch address.",
          error: true
        });
      }
    }
    this.$emit("showAddressForm", this.addresses.length === 0);
  },
  computed: {
    token() {
      return this.$store.getters["authentication/idToken"];
    },
    addresses() {
      return this.$store.getters["address/getAllAddress"];
    }
  },
  methods: {
    deleteAddress(value) {
      let formData = new FormData();
      formData.append("unique_id", value);
      axios
        .delete("/add-user-info", {
          headers: {
            Authorization: "Bearer " + this.token
          },
          data: formData
        })
        .then(res => {
          const address = this.addresses.filter(el => el.unique_id !== value);
          this.$store.dispatch("address/updateAddress", address);
          let defaultAddress = this.addresses.filter(
            el => el.default_address === true
          );
          if (defaultAddress.length === 0) {
            this.userInfo = null;
          }
          let successMessage =
            res.data && res.data.message
              ? res.data
              : { message: "Address deleted successfully.", error: false };
          this.$store.dispatch("address/updateAddress", this.addresses);
          this.$store.dispatch(
            "notification_alert/updateNotification",
            successMessage
          );
        })
        .catch(err => {
          let errorMessage =
            err.response &&
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
    async editAddress(value) {
      try {
        let result = await axios.get(`/add-user-info/${value}`, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        });
        this.address = result.data.address;
        // console.log(this.address)
        // console.log(Object.keys(this.address).length)
        this.addressForm = true;
        // this.$emit("editAddress", true);
      } catch (err) {
        let errorMessage =
          err.response &&
          err.response.data &&
          err.response.data.message &&
          err.response.data.error
            ? err.response.data
            : { message: "Something went wrong", error: true };
        this.$store.dispatch(
          "notification_alert/updateNotification",
          errorMessage
        );
      }
    },
    selectDefaultAddress(unique_id) {
      axios
        .post(`/default-address/${unique_id}`, null, {
          headers: {
            Authorization:
              "Bearer " + this.$store.getters["authentication/idToken"]
          }
        })
        .then(res => {
          this.addresses.forEach(el => {
            if (el.default_address) delete el.default_address;
          });
          this.addresses.forEach(el => {
            if (el.unique_id === unique_id) {
              el.default_address = true;
              this.userInfo = el;
              let successMessage =
                res.data && res.data.message
                  ? res.data
                  : { message: "Default address updated.", error: false };
              this.$store.dispatch(
                "notification_alert/updateNotification",
                successMessage
              );
              return;
            }
          });
        })
        .catch(err => {
          let errorMessage =
            err.response &&
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
    onSave() {
      if (this.addressForm || Object.keys(this.addresses).length == 0) {
        this.$refs.addressForm.onSave();
      } else {
        this.addresses.forEach(el => {
          if (el.default_address === true) {
            this.paymentInfo = true;
          }
          // return;
        });
        if (!this.paymentInfo) {
          this.$store.dispatch("notification_alert/updateNotification", {
            message: "Please select address.",
            error: true
          });
        }
      }
    },
    onBack() {
      this.address = {};
      if (this.paymentInfo) {
        this.paymentInfo = false;
        this.payBtn(); //call this function on back also
        return;
      }
      if (Object.keys(this.addresses).length > 0 && this.addressForm)
        this.addressForm = !this.addressForm;
      else this.$emit("noShippingInfo", true);
    },
    async onSubmit(newAddress) {
      if (Object.keys(this.address).length == 0) {
        try {
          let res = await axios.post("/add-user-info", newAddress, {
            headers: { Authorization: "Bearer " + this.token }
          });
          let successMessage =
            res.data && res.data.message
              ? res.data
              : { message: "Address added successfully.", error: false };
          this.$store.dispatch(
            "notification_alert/updateNotification",
            successMessage
          );
          if (this.addresses.length === 0) {
            const response = await axios.post(
              `/default-address/${res.data.address.unique_id}`,
              null,
              {
                headers: {
                  Authorization: "Bearer " + this.token
                }
              }
            );
            const defaultAddress = await axios.get("/default-address", {
              headers: {
                Authorization: "Bearer " + this.token
              }
            });
            this.$store.dispatch("address/updateAddress", res.data.address);

            if (defaultAddress.data && defaultAddress.data.unique_id) {
              this.addresses.forEach(el => {
                if (el.unique_id === defaultAddress.data.unique_id) {
                  el.default_address = true;
                  // userInfoObject = el;
                  return;
                }
              });
            }
            // this.$store.dispatch("address/updateAddress", res.data.address);
          } else {
            this.$store.dispatch("address/updateAddress", res.data.address);
          }
          this.addressForm = false;
        } catch (err) {
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
        }
      } else {
        this.submitEditedAddress(newAddress);
      }
    },
    submitEditedAddress(editedAddress) {
      axios
        .put("/add-user-info", editedAddress, {
          headers: { Authorization: "Bearer " + this.token }
        })
        .then(res => {
          //for rendering data for product details address
          axios
            .get("/add-user-info", {
              headers: {
                Authorization: "Bearer " + this.token
              }
            })
            .then(res => {
              this.$store.dispatch("address/updateAddress", res.data.address);
            });
          let successMessage =
            res.data && res.data.message
              ? res.data
              : { message: "Address added successfully.", error: false };
          this.$store.dispatch(
            "notification_alert/updateNotification",
            successMessage
          );
          this.addressForm = false;
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
    payBtn() {
      this.$emit("payBtn", this.paymentInfo);
    }
  }
};
</script>
<style lang="scss">
.components__wrapper {
  h3 {
    margin-bottom: 2.6rem !important;
  }
  .address-form {
    min-width: 100%;
    &__button,
    &__heading {
      display: none;
    }
  }
  .profile-info__wrapper {
    position: relative;
    .profile_info {
      min-width: 100%;
      .shipping_info,
      .profile_info__action {
        display: none;
      }
      .personal-details__wrapper,
      .personal-details {
        display: none;
      }
      &__action {
        width: 100%;
        padding: 1.4rem;
        max-height: 5rem;
        border: none;
        margin-bottom: 1rem;
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
  }
}
</style>
