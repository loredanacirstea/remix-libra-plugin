<template>
  <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide class="swiper-margin no-swipe">
        <v-container class="nopadd">
          <v-layout row wrap>
            <v-flex xs8 class="text-xs-left">
              <v-btn
                icon
                class="nav next body-2"
                slot="button-next"
                @click="onGitHub"
              >
                <v-icon small>fa-info</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs4 class="text-xs-right">
              <v-btn
                flat
                class="nav next body-2"
                slot="button-next"
                @click="onSwiperNext"
              >
                <v-icon small>fa-chevron-right</v-icon>
                <span class="text-none" style="padding-left:6px">Deploy</span>
              </v-btn>
            </v-flex>
            <v-flex xs12 v-if="github">
              <span class="text-none">{{github}}</span>
            </v-flex>
            <v-flex xs12>
              <MoveCompile/>
            </v-flex>
          </v-layout>
        </v-container>
      </swiper-slide>
      <swiper-slide class="swiper-margin no-swipe" style="margin-left: 25px;">
        <v-container class="nopadd">
          <v-layout row wrap>
            <v-flex xs12 class="text-xs-left">
              <v-btn
                flat
                class="nav prev body-2"
                slot="button-prev"
                @click="onSwiperPrev"
              >
                <v-icon small>fa-chevron-left</v-icon>
                <span class="text-none" style="padding-left:6px">Compile</span>
              </v-btn>
            </v-flex>
            <v-flex xs12>
              <p>
                Deployment will be available after <a href="https://github.com/libra/libra/issues/142" target="_blank">https://github.com/libra/libra/issues/142</a> is solved.
              </p>
            </v-flex>
            <v-flex xs12>
              <MoveDeploy/>
            </v-flex>
          </v-layout>
        </v-container>
      </swiper-slide>

      <!-- <v-btn
        v-if="currentSlide != 0"
        absolute small top left fab
        color="white"
        slot="button-prev"
        class="nav prev"
        @click="onSwiperPrev"
      >
        <v-icon>fa-search</v-icon>
      </v-btn>
      <v-btn
        v-if="currentSlide < 1"
        absolute small top right fab
        color="white"
        class="nav next"
        slot="button-next"
        @click="onSwiperNext"
      >
        <v-icon>fa-sitemap</v-icon>
      </v-btn> -->
  </swiper>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

import MoveCompile from '../components/MoveCompile';
import MoveDeploy from '../components/MoveDeploy';

Vue.use(VueAwesomeSwiper);

export default {
  components: {
    MoveCompile,
    MoveDeploy,
  },
  data() {
    return {
      swiperOptions: {
        noSwiping: true,
        noSwipingClass: "no-swipe",
        loop: false,
        slidesPerView: "auto",
        initialSlide: 0,
      },
      currentSlide: 0,
      github: null,
    }
  },
  computed: mapState({
    compiled: state => state.compiled,
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }),
  mounted() {
    this.setData();
  },
  methods: {
    async setData() {
      this.$store.dispatch('setCompiler');
      await this.$store.state.remixclient.onload();
      this.setRemixFile();
    },
    setRemixFile() {
      this.$store.state.remixclient.on('fileManager', 'currentFileChanged', (fileName) => {
        this.setSource(fileName);
      });

      this.$store.state.remixclient.call('fileManager', 'getCurrentFile').then((fileName) => {
        this.setSource(fileName);
      }).catch((error) => {
        console.log(error);
        // TODO notification
      });
    },
    setSource(fileName) {
      if (fileName) {
        this.$store.state.contractName = fileName;
        this.$store.state.remixclient.call('fileManager', 'getFile', fileName)
          .then((source) => {
            this.$store.commit('setState', {field: 'source', data: source});
          });
      }
    },
    onSwiperPrev() {
      this.swiper.slidePrev();
      this.currentSlide --;
    },
    onSwiperNext() {
      this.swiper.slideNext();
      this.currentSlide ++;
    },
    onGitHub() {
      if (!this.github) {
        this.github = 'https://github.com/loredanacirstea/remix-libra-plugin';
        window.open(this.github, '_blank');
      } else {
        this.github = null;
      }
    }
  },
}
</script>

<style>
.swiper-margin {
    margin: 0;
    padding: 10px!important;
}
.swiper-container {
    height: 100%;
    margin: 0;
    padding: 0;
}
.swiper-slide {
    width: 100%!important;
}
.fullheight, .v-window, .v-window__container {
    height: 100%;
}
/* .nav{
    position:fixed!important;
    top:3px!important;
}
.nav.prev {
    left: 3px!important;
}
.nav.next {
    right: 3px!important;
} */
.nopadd {
  padding: 0!important;
}
</style>
