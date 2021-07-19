<template>
  <div id="app">
    <div class="title">
      <h3>Rela U (villao)</h3>
    </div>

    <Tinder class="tinder" key-name="id" :queue.sync="queue" :offset-y="10" @submit="onSubmit">
      <template slot-scope="scope">
        <div
          class="pic"
          :style="{
            'background-image': `url(${scope.data.value})`
          }"
        />
        <div class="point">✰ {{ scope.data.point.like }}</div>
      </template>

      <img class="like-pointer" slot="like" src="./assets/like-txt.png">
      <img class="nope-pointer" slot="nope" src="./assets/nope-txt.png">
    </Tinder>
  </div>
</template>

<script>
import Tinder from "vue-tinder";
import firebase from "firebase";
import Db from "./utils/firebase.js";

export default {
  name: "App",
  components: { Tinder },
  data: () => ({
    queue: [],
    offset: 0,
    id: 0,
    data: [],
    points: [],
  }),

  async created() {
    let db = new Db();

    db.getDatabase("points").then(async (snapshot) => {
      if (snapshot.exists()) {
        this.points = await snapshot.val();
        console.log(this.points);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
        console.error(error);
    });

    db.getDatabase("participants").then(async (snapshot) => {
      if (snapshot.exists()) {
        this.data = await snapshot.val();
        this.mock();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
        console.error(error);
    });
  },

  methods: {
    async mock() {
      const list = [];
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[this.offset]) {
          list.push({ id: i, value: this.data[this.offset], point: this.points[i] });
        }
        this.offset++;
      }
      this.queue = this.queue.concat(list);
    },

    onSubmit(data) {
      console.log(data)
      this.updatePoint(data.item.id, data.type)
    },

    async updatePoint(key, type) {
      console.log(key);
      let database = firebase.database();
      let currentPoint = 0;
      database.ref().child('points').child(key).get().then(async (snapshot) => {
          if (snapshot.exists()) {
            currentPoint = await snapshot.val().like;
            await database.ref('points/' + key).set(
              (type == 'like') ?
              { like: currentPoint + 1 } :
              { like: currentPoint }
            );
          } else {
            console.log("No data available");
          }
      }).catch((error) => {
          console.error(error);
      });
    },

    async getPoint(id) {
      let database = firebase.database();
      let currentPoint = 0;
      database.ref().child('points').child(id).get().then(async (snapshot) => {
          if (snapshot.exists()) {
            currentPoint = await snapshot.val().like;
            return currentPoint;
          } else {
            console.log("No data available");
          }
      }).catch((error) => {
          console.error(error);
      });
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

.point {
    position: absolute;
    color: white;
    top: 0;
    background-color: #20262ead;
    padding: 5px 10px;
}

.title {
  color: white;
  text-align: center;
  margin-bottom: 3rem;
}
</style>