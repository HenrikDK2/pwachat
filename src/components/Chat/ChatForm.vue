<template>
  <form>
    <Label for="besked">
      <textarea
        name="besked"
        placeholder="Skriv din besked"
        id="chatInput"
        @keydown="sendMessage"
      />
    </Label>
    <SendButton @click="sendMessage" />
  </form>
</template>

<script>
import SendButton from "./SendButton";
export default {
  name: "ChatForm",
  components: {
    SendButton,
  },
  props: {
    sendMessage: {
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  position: relative;
  & textarea {
    padding: 1rem;
    width: 100%;
    resize: none;
    font-size: 1rem;
    border: none;
    box-shadow: 0 -6px 10px -6px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
}
</style>
