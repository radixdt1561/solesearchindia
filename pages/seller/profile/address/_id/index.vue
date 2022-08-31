<template>
  <AddressForm :address="address" @submit="onSubmit" />
</template>

<script>
import axios from "axios";
import AddressForm from '@/components/seller/AddressForm'
export default {
  components:{
    AddressForm
  },
  data() {
    return {};
  },
  methods: {
    onSubmit(editedAddress) {
      axios
        .put("/add-user-info", editedAddress, {
          headers: { Authorization: "Bearer " + this.token }
        })
        .then(res => {
          let successMessage =
            res.data && res.data.message
              ? res.data
              : { message: "Address added successfully.", error: false };
          this.$store.dispatch(
            "notification_alert/updateNotification",
            successMessage
          );
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
    }
  },
  computed: {
    token() {
      return this.$store.getters["authentication/idToken"];
    }
  },
  async asyncData(context) {
    try {
      let result = await axios.get(
        `/add-user-info/${context.route.params.id}`,
        {
          headers: {
            Authorization:
              "Bearer " + context.store.getters["authentication/idToken"]
          }
        }
      );
      return { address: result.data.address };
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
    }
  }
};
</script>

<style></style>
