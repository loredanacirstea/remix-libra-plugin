<template>
  <div>
    <v-flex xs10>
      <span class="text-uppercase body-2">Bytecode</span>
    </v-flex>
    <v-flex xs12>
      <p class="caption">{{compiled}}</p>
    </v-flex>
  </div>
</template>

<script>
export default {
  props: ['compiled'],
  data() {
    return {}
  },
}
</script>
