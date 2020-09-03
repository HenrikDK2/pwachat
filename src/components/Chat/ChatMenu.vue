<template>
  <section>
    <ul>
      <li @click="connectRoom">
        <Profile />
        <h5>General Chat</h5>
      </li>
    </ul>
    <form>
      <input id="idInput" @keydown="pmChat" placeholder="ID" />
    </form>
    <h6>{{ "#" + userId }}</h6>
  </section>
</template>

<script>
import Img from "../ImgContainer";
import Profile from "./Profile";

export default {
  name: "ChatMenu",
  components: {
    Img,
    Profile,
  },
  props: {
    connectRoom: {
      required: true,
    },
    pmChat: {
      required: true,
    },
    socket: {
      required: true,
    },
  },
  setup() {
    let userId = localStorage.getItem("userId");
    return {
      userId,
      profileSrc: require("../../assets/profile-placeholder.jpg"),
    };
  },
};
</script>

<style lang="scss" scoped>
h6 {
  left: 0;
  margin: 1rem;
  font-size: 1rem;
  bottom: 0;
}

section {
  width: 100vw;
  height: 100%;
  background: var(--primaryColor);
  display: grid;
  position: relative;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 60px;
}

form {
  height: 100%;
  padding: 10px 2rem 0;
  & > input {
    width: 100%;
    height: 40px;
    padding: 0 2rem;
    box-sizing: border-box;
  }
}

ul {
  list-style: none;
  margin: 0;
  overflow-y: scroll;
  padding: 0 1rem;
  & > li {
    background: #fff;
    height: 100px;
    display: flex;
    align-items: center;
    margin: 1rem 0;
    padding: 2rem;
    box-sizing: Border-box;
    cursor: pointer;
    & > h5 {
      font-size: 1.5rem;
      color: #000;
      margin-left: 2rem;
    }
  }
}
</style>
