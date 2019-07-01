<template>
  <v-container class="nopadd">
    <v-layout row wrap class="greyb" style="padding-left: 20px;padding-top: 20px;">
      <v-flex xs2>
        <span class="body-2 text-xs-center grey--text font-weight-bold">Compiler:</span>
      </v-flex>
      <v-flex xs8 offset-xs1>
        <v-select v-model="compilerSelect"
          :items="[compiler.version]"
          solo
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn
          block dark
          :color="isMove ? '#2F3E4E' : 'grey'"
          class="body-2 font-weight-medium"
          style="margin-right:10px;margin-left:10px;"
          @click="onCompile"
        >
          <v-icon small left dark>fa-sync</v-icon>
          <span class="text-capitalize">Compile</span>
          <span class="text-none" style="padding-left:6px">{{contractName}}</span>
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <p class="caption" style="padding-top: 10px;padding-left: 20px;margin-bottom: 0;">
          Compiler Configuration
        </p>
      </v-flex>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12 style="padding-left: 20px;">
        <v-radio-group v-model="typeRadio" class="body-2">
          <v-radio
            v-for="(name, i) in typeopt"
            :key="i"
            :label="name"
            :value="name"
            color="black"
          ></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs10>
        <v-btn
          v-if="compiled"
          flat
          class="body-2"
          style="margin-right:10px;margin-left:10px;"
          @click="clipboardCopy(compiled)"
        >
          <v-icon small left dark>fa-clipboard</v-icon>
          <span class="text-capitalize">Bytecode</span>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
      scriptType: true,
      typeopt: ['module', 'script'],
      typeRadio: 'module',
      compilerSelect: null,
      isMove: true,
    }
  },
  computed: mapState({
    compiler: state => state.compiler,
    compiled: state => state.compiled,
    contractName: state => state.contractName.replace('browser/', ''),
    source: state => state.source,
  }),
  watch: {
    compiler() {
      this.compilerSelect = this.compiler.version;
    },
    contractName() {
      this.isMove = this.contractName.toLowerCase().includes('mvir');
    },
  },
  methods: {
    onCompile() {
      if (!this.isMove) return;
      this.$store.dispatch('setCompiled', this.typeRadio);
    },
    clipboardCopy(text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.log('Oops, unable to copy');
      }
      document.body.removeChild(textArea);
    },
  },
}
</script>

<style>
.nopadd {
  padding: 0!important;
}
.greyb {
  background-color: #EDF0F1;
}
.padd {
  padding-left: 20px;
  padding-top: 20px;
}
</style>
