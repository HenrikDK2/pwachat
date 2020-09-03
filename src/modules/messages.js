import { ref } from "vue";
import { openDB } from "idb";

let messages = ref(null);
export default function useMessages() {
  const load = async () => {
    if ("indexedDB" in window) {
      openDB("Chat", 1, {
        upgrade(db) {
          db.createObjectStore("ChatLog", { keyPath: "id" });
        },
      });
      await reload();
    }
  };

  const reload = async () => {
    const ChatDB = await openDB("Chat", 1);
    messages.value = ChatDB.getAll("ChatLog");
  };

  return { messages, load, reload };
}
