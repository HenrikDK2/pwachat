<template>
  <section>
    <ChatHeader :returnToMenu="returnToMenu" />
    <article :class="messages.length < 1 && 'noMessages'" id="chat">
      <h4 v-if="joke && messages.length < 1">
        {{ joke.joke }}<span v-if="socket.offline">Du er offline</span>
      </h4>
      <p :class="userId === msg.userId && 'ownMessage'" v-for="msg in messages" :key="msg.id">
        {{ msg.content }}
        <span>ID: {{ msg.userId }}</span>
      </p>
    </article>
    <ChatForm :sendMessage="sendMessage" />
  </section>
</template>

<script>
import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import { ref, onMounted, onUpdated } from "vue";

export default {
  name: "PrivateChat",
  components: {
    ChatForm,
    ChatHeader,
  },
  props: {
    messages: {
      required: true,
    },
    socket: {
      required: true,
    },
    returnToMenu: {
      required: true,
    },
    sendMessage: {
      required: true,
    },
  },
  setup() {
    let joke = ref(null);
    let userId = localStorage.getItem("userId");

    onMounted(async () => {
      const data = await fetchData();
      joke.value = data;
    });

    onUpdated(() => {
      const chatElm = document.querySelector("#chat");
      chatElm.scrollTop = chatElm.scrollHeight;
    });

    return { joke, userId };
  },
};

const fetchData = async () => {
  try {
    const jsonData = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    }).then((res) => {
      return res.json();
    });
    return jsonData;
  } catch (error) {}
};
</script>

<style lang="scss" scoped>
h4 {
  font-size: 2rem;
  margin: 0;
  text-align: center;
  color: #dbdbdb;
  & span {
    display: block;
    margin-top: 1rem;
  }
}

.noMessages {
  justify-content: center;
}

section {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  height: 100vh;
  grid-template-rows: 100px 1fr 100px;

  #chat {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    overflow-y: Scroll;

    & p {
      margin: 1rem auto 1rem 0;
      background: #e86a6a;
      padding: 1rem;
      max-width: 48%;
      word-wrap: break-word;
      border-radius: 25px;
      color: #fff;
      font-weight: bold;
      position: relative;

      & > span {
        position: absolute;
        bottom: -1.25rem;
        left: 0.8rem;
        width: min-content;
        white-space: pre;
        color: #c8c8c8;
      }
    }

    .ownMessage {
      background: var(--primaryColor);
      margin: 1rem 0 1rem auto;
      & > span {
        left: initial;
        right: 0.8rem;
      }
    }
  }
}
</style>
