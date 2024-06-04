<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div class="main">
    <div class="title">
      <img src="@/assets/google_logo.svg" alt="" srcset="" />
    </div>
    <div class="search">
      <input type="text" placeholder="在Google中搜索 或输入网址" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  .title {
    font-size: 6rem;
    font-weight: 500;
    text-align: center;
    user-select: none;
    img {
      user-select: none;
    }
  }
  .search {
    text-align: center;
    input {
      height: 3.5rem;
      width: 40%;
      border: none;
      font-weight: 500;
      font-size: 1.1rem;
      padding: 0 1.4rem;
      border-radius: 4rem;
      &:focus-visible {
        outline: none;
      }
    }
  }
}
</style>
