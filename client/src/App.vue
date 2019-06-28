<template>
  <v-app>
    <v-content>
      <PluginRoot/>
    </v-content>
  </v-app>
</template>

<script>
import PluginRoot from './views/PluginRoot';
export default {
  name: 'App',
  components: {
    PluginRoot,
  },
  data () {
    return {
      //
    }
  }
}
</script>
