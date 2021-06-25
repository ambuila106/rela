<template>
  <div id="app">
    <h4 style="color: white; text-align: center; margin-bottom: 3rem;">Rela U (villao)</h4>
    <Tinder class="tinder" key-name="id" :queue.sync="queue" :offset-y="10" @submit="onSubmit">
      <template slot-scope="scope">
        <div
          class="pic"
          :style="{
            'background-image': `url(${scope.data.id})`
          }"
        />
      </template>
      <img class="like-pointer" slot="like" src="./assets/like-txt.png">
      <img class="nope-pointer" slot="nope" src="./assets/nope-txt.png">
      <img class="super-pointer" slot="super" src="./assets/super-txt.png">
    </Tinder>
  </div>
</template>

<script>
import Tinder from "vue-tinder";
import source from "./bing";
import Api from "./api/index.js"

export default {
  name: "App",
  components: { Tinder },
  data: () => ({
    queue: [],
    offset: 0,
    id: 0,
  }),

  async created() {
    this.mock();
    let api = new Api();
    api.getIdByUser('iambuila').then(r => {
        this.id = r.data.data.id;
    }).catch(function (error) {
        console.error(error);
    });
  },

  methods: {
    mock(count = 5) {
      const list = [];
      for (let i = 0; i < count; i++) {
        list.push({ id: source[this.offset] });
        this.offset++;
      }
      this.queue = this.queue.concat(list);
    },
    onSubmit() {
      if (this.queue.length < 3) {
        this.mock();
      }
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
}

body {
  margin: 0;
  background-color: #20262e;
  overflow: hidden;
}

#app .vue-tinder {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 23px;
  bottom: 46px;
  margin: auto;
  min-width: 300px;
  max-width: 355px;
}

.nope-pointer,
.like-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  width: 150px;
  height: 150px;
}

.nope-pointer {
  right: 10px;
}

.like-pointer {
  left: 10px;
}

.super-pointer {
  position: absolute;
  z-index: 1;
  bottom: 80px;
  left: 0;
  right: 0;
  margin: auto;
  width: 112px;
  height: 78px;
}

.tinder {
    margin-top: 3rem !important;
}

.pic {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
</style>