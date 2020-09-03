<template>
  <div>
    <img @dragstart="stopDrag" :src="src" :alt="alt" />
  </div>
</template>

<script>
export default {
  name: "ImgContainer",
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: "An image"
    }
  },
  methods: {
    stopDrag: e => {
      e.preventDefault();
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  width: 50px;
  height: auto;
  & > img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>