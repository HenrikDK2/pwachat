<template>
  <section>
    <ul>
      <li @click="connectRoom">
        <Profile />
        <h5>General Chat</h5>
      </li>
    </ul>

    <aside>
      <h6>Dit ID:{{ "#" + userId }}</h6>
      <h5
        :class="socket.connected ? 'online' : 'offline'"
      >{{socket.connected ? 'Online' : 'Offline'}}</h5>
    </aside>
  </section>
</template>

<script>
import Img from "../ImgContainer";
import Profile from "./Profile";

export default {
  name: "ChatMenu",
  components: {
    Img,
    Profile
  },
  props: {
    connectRoom: {
      required: true
    },
    pmChat: {
      required: true
    },
    socket: {
      required: true
    }
  },
  setup() {
    let userId = localStorage.getItem("userId");
    return {
      userId,
      profileSrc: require("../../assets/profile-placeholder.jpg")
    };
  }
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

aside {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-sizing: border-box;
  h5 {
    margin: 0;
    font-size: 1.25rem;
  }
  h6 {
    margin: 0;
  }
  .offline {
    color: red;
  }

  .online {
    color: green;
  }
}

ul {
  list-style: none;
  margin: 0;
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
