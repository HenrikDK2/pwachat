<template>
  <Flickity
    v-if="socket && messages"
    class="menuSwiper"
    ref="flickityRef"
    :options="flickityOptions"
  >
    <ChatMenu :userId="userId" :connectRoom="connectRoom" :socket="socket" :pmChat="pmChat" />
    <PrivateChat
      :messages="messages"
      :returnToMenu="returnToMenu"
      :socket="socket"
      :sendMessage="sendMessage"
    />
  </Flickity>
</template>

<script>
import { ref } from "vue";
import io from "socket.io-client";
import Flickity from "vue-flickity";
import PrivateChat from "./PrivateChat";
import ChatMenu from "./ChatMenu";
import uniqid from "uniqid";
import { openDB } from "idb";

export default {
  name: "Chat",
  components: {
    PrivateChat,
    Flickity,
    ChatMenu
  },
  async setup() {
    let socket = await ref(
      await io().connect(window.location.origin, { transports: ["websocket"] })
    );
    let messages = ref(null);
    let flickityRef = ref(null);
    let flickityOptions = {
      prevNextButtons: false,
      setGallerySize: false,
      pageDots: false,
      draggable: false
    };

    if ("indexedDB" in window) {
      await openDB("Chat", 1, {
        upgrade(db) {
          db.createObjectStore("ChatLog");
        }
      });
    }

    socket.value.on("connect", async function() {
      if (!localStorage.getItem("userId")) {
        localStorage.setItem("userId", uniqid());
      }
      const ChatDB = await openDB("Chat", 1);
      messages.value = await ChatDB.getAll("ChatLog");

      socket.value.on("message", async msg => {
        addMessagesToIdb(msg);
      });
    });

    socket.value.once("connect_error", async function() {
      const ChatDB = await openDB("Chat", 1);
      messages.value = await ChatDB.getAll("ChatLog");
    });

    async function addMessagesToIdb(msg) {
      const ChatDB = await openDB("Chat", 1);
      await ChatDB.add("ChatLog", msg, +new Date());
      messages.value = await ChatDB.getAll("ChatLog");
      ChatDB.close();
    }

    function sendMessage(e) {
      if ((e.type === "keydown" && e.keyCode === 13) || e.type !== "keydown") {
        const chatInput = document.querySelector("#chatInput");
        if (chatInput.value.length > 0) {
          e.preventDefault();
          let msg = {
            content: chatInput.value,
            created: new Date(),
            id: uniqid(),
            userId: localStorage.getItem("userId")
          };
          addMessagesToIdb(msg);
          socket.value.emit("message", msg);
          chatInput.value = "";
        }
      }
    }
    function returnToMenu() {
      flickityRef.value.previous();
    }

    function connectRoom(e) {
      flickityRef.value.next();
    }

    return {
      sendMessage,
      socket,
      returnToMenu,
      flickityOptions,
      messages,
      connectRoom,
      flickityRef
    };
  }
};
</script>

<style lang="scss" scoped>
.menuSwiper {
  height: 100vh !important;
}
</style>
