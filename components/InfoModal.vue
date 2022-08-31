<template>
  <div>
    <button
      style="background:none;border:none"
      id="info-btn"
      @click="$bvModal.show(id)"
    >
      <b-question />
    </button>

    <b-modal :id="id" hide-footer hide-header centered size="sm">
      <div class="text-center mt-5">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
      <button
        class="mt-3 black-button"
        style="max-width:100%"
        block
        @click="$bvModal.hide(id)"
      >
        GOT IT
      </button>
    </b-modal>
  </div>
</template>
<script>
import { BModal, BIconQuestionCircleFill } from "bootstrap-vue";
export default {
  props: {
    id: {
      type: String,
      default: "info"
    },
    title: {
      type: String,
      default: "Title"
    },
    description: {
      type: String,
      default: "description"
    }
  },
  components: {
    "b-modal": BModal,
    "b-question": BIconQuestionCircleFill
  }
};
</script>

<style lang="scss" scoped>
#info-btn {
  svg {
    font-size: 16px;
  }
}

h3 {
  color: rgb(28, 28, 32);
  font-weight: 600;
  font-size: 18px;
}

p {
  font-size: 14px;
}
</style>
