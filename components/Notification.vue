<template>
  <notifications
    group="custom-template"
    position="top right"
    :duration="500"
    :width="windowHeight > 575 ? '300' : '200'"
  >
    <template slot="body" slot-scope="props">
      <div class="custom-template">
        <div class="custom-template-icon">
          <svg
            class="custom-template-icon--check"
            v-if="!isError"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>check</title>
            <path
              d="M8.294 16.998c-0.435 0-0.847-0.203-1.111-0.553l-3.573-4.721c-0.465-0.613-0.344-1.486 0.27-1.951 0.615-0.467 1.488-0.344 1.953 0.27l2.351 3.104 5.911-9.492c0.407-0.652 1.267-0.852 1.921-0.445s0.854 1.266 0.446 1.92l-6.984 11.21c-0.242 0.391-0.661 0.635-1.12 0.656-0.022 0.002-0.042 0.002-0.064 0.002z"
            />
          </svg>
          <svg
            class="custom-template-icon--cross"
            v-if="isError"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>circle-with-cross</title>
            <path
              d="M10 1.6c-4.639 0-8.4 3.761-8.4 8.4s3.761 8.4 8.4 8.4 8.4-3.761 8.4-8.4c0-4.639-3.761-8.4-8.4-8.4zM14.789 13.061l-1.729 1.729-3.060-3.061-3.061 3.060-1.729-1.729 3.062-3.060-3.061-3.061 1.729-1.728 3.060 3.060 3.061-3.061 1.729 1.729-3.062 3.061 3.061 3.061z"
            />
          </svg>
        </div>
        <div class="custom-template-content">
          <div class="custom-template-text">{{ props.item.text }}</div>
        </div>
      </div>
    </template>
  </notifications>
</template>

<script>
export default {
  data() {
    return {
      notification: '',
      isError: false,
      windowHeight: 0,
    }
  },
  mounted() {
    this.windowHeight = window.innerWidth
  },
  props: ['notificationData'],
  computed: {
    animation() {
      return {
        enter(element) {
          /*
           *  "element" - is a notification element
           *    (before animation, meaning that you can take it's initial height, width, color, etc)
           */
          let height = element.clientHeight

          return {
            // Animates from 0px to "height"
            height: [height, 0],

            // Animates from 0 to random opacity (in range between 0.5 and 1)
            opacity: [Math.random() * 0.5 + 0.5, 0],
          }
        },
        leave: {
          height: 0,
          opacity: 0,
        },
      }
    },
  },
  watch: {
    notificationData(newData, oldData) {
      if (newData.error) {
        this.isError = true
      } else {
        this.isError = false
      }
      this.$notify({
        group: 'custom-template',
        title: newData.error ? 'ERROR!!' : 'SUCCESS!!',
        text: newData.message,
        type: newData.error ? 'error' : 'success',
      })
    },
  },
}
</script>

<style lang="scss">
.v-fade-left-enter-active,
.v-fade-left-leave-active,
.v-fade-left-move {
  transition: all 0.5s;
}
.v-fade-left-enter,
.v-fade-left-leave-to {
  opacity: 0;
  transform: translateY(-500px) scale(0.2);
}
</style>

<style lang="scss" scoped>
.custom-template.active {
  background: #2d2e35 !important;
}
.custom-template {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: left;
  font-size: 13px;
  margin: 5px;
  margin-bottom: 0;
  align-items: center;
  justify-content: center;
  &,
  & > div {
    box-sizing: border-box;
  }
  background: #2d2e35;
  border: 2px solid #2d2e35;
  .custom-template-icon {
    flex: 0 1 auto;
    color: ghostwhite;
    font-size: 32px;
    padding: 0 10px;
    align-items: center;
    display: flex;

    &--check {
      fill: greenyellow;
    }
    &--cross {
      fill: red;
    }
  }
  .custom-template-close {
    flex: 0 1 auto;
    padding: 0 20px;
    font-size: 16px;
    opacity: 0.2;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .custom-template-content {
    padding: 10px;
    flex: 1 0 auto;
    color: ghostwhite;
    .custom-template-title {
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 600;
    }
    .custom-template-text {
      font-size: 14px;
      @media screen and (max-width:575px) {
        font-size: 10px;
      }
    }
  }
}
.posterImage-icon {
  fill: #fff;
}
</style>
