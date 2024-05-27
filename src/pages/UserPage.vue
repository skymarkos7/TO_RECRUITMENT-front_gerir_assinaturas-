<template>
  <q-page>
    <h4 style="margin:30px">
      <TitleComponent/>{{ title }}
    </h4>

    <i class="fa fa-spinner fa-spin flex flex-center" v-show="load">
      <q-circular-progress
        indeterminate
        size="45px"
        :thickness="1"
        color="grey-8"
        track-color="lime"
        class="q-ma-md"
      />
    </i>

    <div class="row justify-around items-center" v-if="!load">
      <div class="fa fa-spinner fa-spin flex flex-center" style="width: 100%;">
      <q-input
        style="max-width:600px; width: 50%; margin-bottom: 30px;"
        v-model="search"
        filled
        rounded
        placeholder="Buscar usuário pelo nome"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

      <div v-for="(user, index) in filteredUsers" :key="index">
        <div class="q-pa-md">
          <q-card

            class="card-user col-auto"
          >
            <q-card-section>
              <div class="head-card">
                <a
                  ><q-btn title="apagar usuário" @click="deleteUser(user.id)" class="float-right">
                    <q-icon name="delete" color="red" size="1.2em" /> </q-btn
                ></a>

                <a :href="url"
                  ><q-btn title="Expandir" @click="goUser(user.id)" class="float-right">
                    <q-icon name="open_in_full" color="teal" size="1em" /> </q-btn
                ></a>
              </div>

              <div class="info-user text-h6">{{ user.name }}</div>
              <div class="info-user text-subtitle3">ID: {{ user.id }}</div>
              <div class="info-user text-subtitle3">E-mail: <a :href="'mailto:' + user.mail"> {{ user.mail }} </a></div>
              <div class="info-user text-subtitle3">Telefone: <a :href="'tel:' + user.phone"> {{ user.phone }} </a></div>
            </q-card-section>

          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";
import { ref } from "vue";
import TitleComponent from "src/components/TitleComponent.vue";

export default defineComponent({
  name: "UserPage",
  components:{
    TitleComponent
  },
  data() {
    return {
      user: [],
      load: false,
      url: '',
      search: '',
      title: 'Usuários'
    };
  },
  setup() {
    return {
      tab: ref("one"),
    };
  },
  methods: {
    loadData() {
      const url = `http://localhost:8000/api/user/getall`;
      this.load = true; // define load como verdadeiro antes da chamada da API
      api
        .get(url, {
        })
        .then((response) => {

          this.user = response.data.data;

        })
        .finally(() => {
          this.load = false; // define load como falso após a chamada da API
        });
    },

    goUser(id) {
      this.url = `#/details/${id}`; // Recebe o id e o agrega na url que será chamada
    },

    deleteUser(id) {
      const url = `http://localhost:8000/api/user/delete/${id}`;
      this.load = true; // define load como verdadeiro antes da chamada da API
      api
        .delete(url, {
        })
        .then((response) => {

          this.user = response.data.data;

          alert('usuário apagado com sucesso');
        })
        .finally(() => {
          this.load = false; // define load como falso após a chamada da API
        });
    }
  },
  mounted: function () {

    this.loadData();
  },
  computed:{
    filteredUsers() {
      return this.user.filter(user => user.name.toLowerCase().includes(this.search.toLowerCase()))  // Filtrar usuários pelo nome
    }
  }
});
</script>




<style lang="scss" scoped>

.card-user {
  border-radius: 30px;
  width: 100%;
  max-width: 250px;
  background-color: #f4f8f9;
              min-width: 310px;
              min-height: 250px;
}
.user-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.head-card {
  display: flex;
  justify-content: space-between;
}

.info-user {
  margin: 20px;
}

.user-card {
  width: 300px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.user-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.user-details {
  padding: 20px;
}

.user-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.user-by {
  color: #666;
  margin-bottom: 10px;
}

.user-body {
  margin-bottom: 20px;
}

.read-more-link {
  display: inline-block;
  padding: 10px;
  background-color: #0084ff;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
}
</style>






