<template>
  <ProfileInfo
    :addresses="addresses"
    @deleteAction="deleteAddress"
    @editAction="editAddress"
    @editName="editName"
    :selectDefaultAddress="selectDefaultAddress"
    :userInfo="userInfo"
    :user="user"
  />
</template>

<script>
import axios from "axios";
import ProfileInfo from "@/components/seller/ProfileInfo";

export default {
  components: {
    ProfileInfo,
  },
  async asyncData(context) {
    try {
      let userInfoObject = null;
      const user = await axios.get("/user-update", {
        headers: {
          Authorization:
            "Bearer " + context.store.getters["authentication/idToken"],
        },
      });
      const results = await axios.get("/add-user-info", {
        headers: {
          Authorization:
            "Bearer " + context.store.getters["authentication/idToken"],
        },
      });
      const defaultAddress = await axios.get("/default-address", {
        headers: {
          Authorization:
            "Bearer " + context.store.getters["authentication/idToken"],
        },
      });
      if (defaultAddress.data && defaultAddress.data.unique_id) {
        results.data.address.forEach((el) => {
          if (el.unique_id === defaultAddress.data.unique_id) {
            el.default_address = true;
            userInfoObject = el;
            return;
          }
        });
      }
      context.store.dispatch("address/updateAddress", results.data.address);
      return { addresses: results.data.address, userInfo: userInfoObject, user: user.data.user };
    } catch (err) {
      let errorMessage =
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.error
          ? err.response.data
          : { message: "Something went wrong", error: true };
      context.store.dispatch(
        "notification_alert/updateNotification",
        errorMessage
      );
      console.log(err);
    }
  },
  methods: {
    deleteAddress(value) {
      let formData = new FormData();
      formData.append("unique_id", value);
      axios
        .delete("/add-user-info", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
          data: formData,
        })
        .then((res) => {
          this.addresses = this.addresses.filter(
            (el) => el.unique_id !== value
          );
          let defaultAddress = this.addresses.filter(
            (el) => el.default_address === true
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
        .catch((err) => {
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
    editAddress(value) {
      this.$router.push(`/seller/profile/address/${value}`);
    },
    editName() {
      this.$router.push(`/seller/profile/name`);
    },
    selectDefaultAddress(unique_id) {
      axios
        .post(`/default-address/${unique_id}`, null, {
          headers: {
            Authorization:
              "Bearer " + this.$store.getters["authentication/idToken"],
          },
        })
        .then((res) => {
          this.addresses.forEach((el) => {
            if (el.default_address) delete el.default_address;
          });
          this.addresses.forEach((el) => {
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
        .catch((err) => {
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
  },
  computed: {
    token() {
      return this.$store.getters["authentication/idToken"];
    },
  },
};
</script>

<style></style>
