<template>
  <div id="app">
    <WordCount msg="A word counting thing"/>
  </div>
</template>

<script>
import WordCount from './components/WordCount.vue'

export default {
  name: 'app',
  components: {
    WordCount
  }
}
</script>

<style>

</style>
