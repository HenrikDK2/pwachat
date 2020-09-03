<template>
  <button>
    <Img :src="sendSvg" />
  </button>
</template>

<script>
import Img from "../ImgContainer";
export default {
  name: "SendButton",
  components: {
    Img,
  },
  setup() {
    return {
      sendSvg: require("../../assets/send.svg"),
    };
  },
};
</script>

<style lang="scss" scoped>
button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  background: #fff;
  padding: 0.3rem;
  border-radius: 50%;
  cursor: pointer;

  & > div {
    width: 2rem;
    transform: rotate(-40deg);
  }
}
</style>
