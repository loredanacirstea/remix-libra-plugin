<template>
  <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide class="swiper-margin no-swipe">
        <MoveCompile/>
      </swiper-slide>
      <swiper-slide class="swiper-margin no-swipe">
        <MoveDeploy/>
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
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.setData();
  },
  methods: {
    async setData() {
      this.$store.dispatch('setCompiler');
      await this.$store.state.remixclient.onload();
      const fileName = await this.$store.state.remixclient.call('fileManager', 'getCurrentFile');
      this.setSource(fileName);
      this.listenRemixFile();
    },
    listenRemixFile() {
      this.$store.state.remixclient.on('fileManager', 'currentFileChanged', (fileName) => {
        console.log('listenRemixFile', fileName);
        this.setSource(fileName);
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
  },
}
</script>

<style>
.swiper-margin {
    margin: 0;
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
.nav{
    position:fixed!important;
    top:3px!important;
}
.nav.prev {
    left: 3px!important;
}
.nav.next {
    right: 3px!important;
}
</style>
