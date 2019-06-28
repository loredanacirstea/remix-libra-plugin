<template>
  <div>
    <p>Compiler: {{compiler.version}}</p>
    <v-btn block @click="onCompile">
      Compile
    </v-btn>
    {{compiled}}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
      //
    }
  },
  computed: mapState({
    compiler: state => state.compiler,
    compiled: state => state.compiled,
  }),
  methods: {
    onCompile() {
      const source = '';
      this.$store.dispatch('setCompiled', source);
    }
  }
}
</script>
