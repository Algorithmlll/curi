<template>
  <div>
    <button
      type='button'
      v-on:click="onClick"
    >
      Login
    </button>
  </div>
</template>

<script>
export default {
  name: "login",
  methods: {
    onClick: function(e) {
      this.$store.commit("login");
      const { query } = this.$curi.response.location;
      this.$router.history.navigate(query.next || "/", "REPLACE");
    }
  }
};
</script>
