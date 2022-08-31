<template>
  <div class="comingsoon">
    <div class="container">
      <img src="" alt="" />
    </div>
    <div
      class="comingsoon__text container d-flex flex-column align-items-center"
    >
      <h5>Keep you posted?</h5>
      <p>
        Please provide your information below and <br />
        we will inform you when this collection goes live.
      </p>
      <form class="d-flex flex-column align-items-center">
        <input type="email" name="comingsoonemail" id="comingsoonemail" />
        <button class="black-button" type="submit">Yeah, I’m in!</button>
      </form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.comingsoon {
  &__text {
    text-align: center;
    color: black;
    h5 {
      font-size: 1.8rem;
      font-weight: bold;
    }
    p {
      font-size: 1.4rem;
      font-weight: 500;
    }
    form {
      width: 35rem;
      border: 1px solid red;
      input {
        width: 90%;
        border: solid 1px #8c8c8c;
        background-color: #ffffff;
        height: 3rem;
      }
    }
  }
}
</style>
