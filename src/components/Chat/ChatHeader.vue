<template>
  <article class="chatHeader">
    <Profile />
    <h5>General Chat</h5>
    <button>
      <Img :src="revert" />
    </button>
  </article>
</template>

<script>
import Profile from "./Profile";
import Img from "../ImgContainer";
export default {
  name: "ChatHeader",
  components: {
    Profile,
    Img,
  },
  setup() {
    return {
      revert: require("../../assets/arrow-undo-outline.svg"),
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  button {
    background: transparent;
    border: none;
    margin: 0 0 0 auto;
    cursor: pointer;
    padding: 0;
  }

  .chatHeader {
    background: var(--primaryColor);
    display: flex;
    align-items: center;
    padding: 2rem;
    box-sizing: border-box;
    & > h5 {
      font-size: 1.5rem;
      color: #fff;
      margin-left: 2rem;
    }
  }
}
</style>
