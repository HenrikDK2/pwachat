<template>
  <Flickity v-if="socketLoaded" class="menuSwiper" ref="flickityRef" :options="flickityOptions">
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
import { ref, onMounted, reactive } from "vue";
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
    ChatMenu,
  },
  async setup() {
    let socket = await ref(
      await io().connect(window.location.origin, { transports: ["websocket"] })
    );
    let messages = ref(null);
    let socketLoaded = ref(false);
    let flickityRef = ref(null);
    let flickityOptions = {
      prevNextButtons: false,
      setGallerySize: false,
      pageDots: false,
      draggable: true,
    };

    if ("indexedDB" in window) {
      openDB("Chat", 1, {
        upgrade(db) {
          db.createObjectStore("ChatLog", { keyPath: "created" });
        },
      });
    }

    socket.value.on("connect", async function() {
      if (!socketLoaded.value) {
        if (!localStorage.getItem("userId")) {
          localStorage.setItem("userId", uniqid());
        }
        const ChatDB = await openDB("Chat", 1);
        messages.value = await ChatDB.getAll("ChatLog");
        socketLoaded.value = true;
      }

      socket.value.on("message", async (msg) => {
        const ChatDB = await openDB("Chat", 1);
        await ChatDB.add("ChatLog", msg);
        messages.value = await ChatDB.getAll("ChatLog");
        ChatDB.close();
      });
    });

    socket.value.once("connect_error", async function() {
      socket.value.offline = true;
      const ChatDB = await openDB("Chat", 1);
      messages.value = await ChatDB.getAll("ChatLog");
      socketLoaded.value = true;
    });

    function connectRoom(e) {
      flickityRef.value.next();
    }

    function pmChat(e) {
      const idInpuElm = document.querySelector("#idInput");

      if (e.type === "keydown" && e.keyCode === 13) {
        e.preventDefault();
        socket.value.emit("pmChat", idInpuElm.value);
        idInpuElm.value = "";
      }
    }

    function sendMessage(e) {
      if ((e.type === "keydown" && e.keyCode === 13) || e.type !== "keydown") {
        const chatInput = document.querySelector("#chatInput");
        if (chatInput.value.length > 0) {
          e.preventDefault();
          socket.value.emit("message", {
            content: chatInput.value,
            userId: localStorage.getItem("userId"),
          });
          chatInput.value = "";
        }
      }
    }
    function returnToMenu() {
      flickityRef.value.previous();
    }

    return {
      socketLoaded,
      sendMessage,
      socket,
      returnToMenu,
      flickityOptions,
      messages,
      connectRoom,
      pmChat,
      flickityRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.menuSwiper {
  height: 100vh !important;
}
</style>
