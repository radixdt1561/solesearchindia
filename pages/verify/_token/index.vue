<template>
  <div class="loaderConatainer"><Loader /></div>
</template>
<script>
import axios from "axios";
import Loader from "@/components/loader";
import { BIconCheckCircle } from "bootstrap-vue";
export default {
  components: {
    Loader,
    "b-check": BIconCheckCircle
  },
  mounted() {
    let verification_token = this.$route.params.token;
    axios
      .patch(
        "/verifyUser",
        {},
        { headers: { Authorization: "Bearer " + verification_token } }
      )
      .then(res => {
        if ((res.status = 200)) {
          const h = this.$createElement;
          const messageVNode = h("div", { class: ["foobar"] }, [
            h("p", { class: ["text-center"] }, ["Verified Successfully."])
          ]);
          this.$bvModal
            .msgBoxConfirm([messageVNode], {
              title: false,
              size: "sm",
              buttonSize: "lg",
              okVariant: "success",
              footerClass: "p-2 border-top-0",
              bodyClass: "text-center modal-text",
              centered: true
            })
            .then(() => {
              this.$router.replace("/");
            });
          this.$store.dispatch("notification_alert/updateNotification", {
            error: false,
            message: "You have been verified succesfully."
          });
        }
      })
      .catch(err => {
        this.$store.dispatch("notification_alert/updateNotification", {
          error: true,
          message: "Failed to verify."
        });
      });
  }
};
</script>

<style lang="scss" scoped>
.loaderConatainer {
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
