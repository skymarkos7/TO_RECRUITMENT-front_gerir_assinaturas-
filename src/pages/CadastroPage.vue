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
        placeholder="Buscar cadastros"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

      <div v-for="(cadastro, index) in filteredcadastros" :key="index">
        <div class="q-pa-md">
          <q-card

            class="card-cadastro col-auto"
          >
            <q-card-section>
              <a :href="url"
                ><q-btn @click="gocadastro(cadastro.id)" class="float-right">
                  <q-icon name="open_in_full" color="teal" size="1em" /> </q-btn
              ></a>

              <div class="text-h6">{{ cadastro.nome }}</div>
              <div class="text-subtitle3">Código {{ cadastro.codigo }}</div>
              <div class="text-subtitle3">ID: {{ cadastro.id }}</div>
              <div class="text-subtitle3">E-mail: {{ cadastro.email }}</div>
              <div class="text-subtitle3">Telefone: {{ cadastro.telefone }}</div>
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
  name: "CadastroPage",
  components:{
    TitleComponent
  },
  data() {
    return {
      cadastros: [],
      load: false,
      url: '',
      search: '',
      title: 'cadastros'
    };
  },
  setup() {
    return {
      tab: ref("one"),
    };
  },
  methods: {
    loadData() {
      const url = `http://localhost:8000/api/cadastro/getall`;
      this.load = true; // define load como verdadeiro antes da chamada da API
      api
        .get(url, {
        })
        .then((response) => {

          this.cadastros = response.data.data;
        })
        .finally(() => {
          this.load = false; // define load como falso após a chamada da API
        });
    },

    gocadastro(id) {
      this.url = `#/details/${id}`; // Recebe o id e o agrega na url que será chamada
    },
  },
  mounted: function () {

    this.loadData();
  },
  computed:{
    filteredcadastros() {
      return this.cadastros.filter(cadastro => cadastro.nome.toLowerCase().includes(this.search.toLowerCase()))  // Filtrar posts pelo título
    }
  }
});
</script>




<style lang="scss" scoped>

.card-cadastro {
  width: 100%;
  max-width: 250px;
  background-color: #f4f8f9;
              min-width: 310px;
              min-height: 250px;
}
.cadastros-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.cadastro-card {
  width: 300px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.cadastro-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.cadastro-details {
  padding: 20px;
}

.cadastro-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.cadastro-by {
  color: #666;
  margin-bottom: 10px;
}

.cadastro-body {
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






