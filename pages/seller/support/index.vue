<template>
  <div class="d-flex justify-content-center">
    <iframe
      id="zsfeedbackFrame"
      width="890"
      height="570"
      name="zsfeedbackFrame"
      scrolling="no"
      allowtransparency="false"
      frameborder="0"
      border="0"
      src="https://desk.zoho.in/support/fbw?formType=AdvancedWebForm&fbwId=edbsn6d4fdfb32c87fc20fbdd0aca39e80c707a8b519a784f0a6cc58cc7549ae2e744&xnQsjsdp=edbsn9376b7fc9277b4941f7a361811a20c67&mode=showNewWidget&displayType=iframe"
      >Loading....</iframe
    >
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "Customer Support",
      script: [
        {
          hid: "zoho",
          src:
            "https://desk.zoho.in/portal/api/feedbackwidget/58941000000109234?orgId=60012149644&displayType=iframe"
        }
      ]
    };
  }
};
</script>
