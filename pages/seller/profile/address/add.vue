<template>
  <AddressForm @submit="onSubmit" />
</template>

<script>
import axios from "axios";
import AddressForm from '@/components/seller/AddressForm'
export default {
  components:{
    AddressForm
  },
  methods: {
    async onSubmit(newAddress) {
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
        if (this.$store.getters["address/getAllAddress"].length === 0) {
          const response = await axios.post(
            `/default-address/${res.data.address.unique_id}`,
            null,
            {
              headers: {
                Authorization:
                  "Bearer " + this.$store.getters["authentication/idToken"]
              }
            }
          );
        }
        this.$router.push("/seller/profile");
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
    }
  },
  computed: {
    token() {
      return this.$store.getters["authentication/idToken"];
    }
  }
};
</script>

<style></style>
