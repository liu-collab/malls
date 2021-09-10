<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" :class="{check:isactive}" alt="">
  </div>
</template>
<script>
  export default {
    name: '',
    props: {
      isactive: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {

      };
    },
    methods: {
    },
  }
</script>
<style scoped>
  .check-button img {
    border-radius: 50%;
    border: 2px solid #ccc;
  }

  .check {
    border-color: var(--color-tint);
    background-color: var(--color-tint);

  }
</style>