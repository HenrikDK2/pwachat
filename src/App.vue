<template>
  <Suspense>
    <main>
      <Chat />
    </main>
  </Suspense>
</template>

<script>
import Chat from "./components/Chat";

export default {
  name: "App",
  components: { Chat },
};
</script>

<style lang="scss">
:root {
  --chatBackground: #f1f3f4;
  --primaryColor: #38a0d7;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: var(--chatBackground);
}
</style>
