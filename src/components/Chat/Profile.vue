<template>
  <Img class="profile" :src="profileSrc" />
</template>

<script>
import Img from "../ImgContainer";
export default {
  name: "Profile",
  components: {
    Img,
  },
  setup() {
    return {
      profileSrc: require("../../assets/profile-placeholder.jpg"),
    };
  },
};
</script>

<style lang="scss">
.profile {
  width: 60px;
  height: auto;
  & > img {
    border-radius: 50%;
  }
}
</style>
