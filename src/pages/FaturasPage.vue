<template>
  <q-page>
    <h4 style="margin:30px"><TitleComponent />{{ title }}</h4>
    <div>
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
      <div class="fa fa-spinner fa-spin flex flex-center" v-if="!load">
        <q-input
          style="max-width: 600px; width: 50%; margin-bottom: 30px"
          v-model="search"
          filled
          rounded
          placeholder="Buscar faturas pela descrição"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <div class="faturas-container">
          <div
            v-for="(fatura, index) in filteredfatura"
            :key="index"
            style="width: 100%; max-width: 700px"
            class="fatura-card"
          >
            <div class="fatura-details">
              <h5 class="fatura-title">{{ fatura.descricao }}
                <q-icon name="tv" color="purple" size="1.5em" />
              </h5>
              <p class="fatura-by">Fatura ID: {{ fatura.id }}</p>
              <p class="fatura-by">ID da assinatura responsável: {{ fatura.assinatura }}</p>
              <p class="fatura-body">Cadastro: {{ fatura.cadastro }}</p>
              <p class="fatura-body">Valor: {{ fatura.valor }}
                <q-icon name="attach_money" color="purple" size="1.5em" />
              </p>
              <p class="fatura-body">Vencimento: {{ fatura.vencimento }}
                <q-icon name="calendar_month" color="purple" size="1.5em" />
              </p>
              <p class="fatura-body">Criado em: {{ fatura.created_at }}</p>
              <p class="fatura-body">Atualizado em: {{ fatura.updated_at }}</p>
              <button class="read-more-link">
                  {{ fatura.status }}
                  <q-icon name="chat" color="white" size="1.5em" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";
import { useStore } from "vuex";
import TitleComponent from "components/TitleComponent.vue";

export default defineComponent({
  name: "FaturasPage",
  components: {
    TitleComponent,
  },
  data() {
    return {
      faturas: [],
      load: false,
      url: "",
      title: "Faturas",
      search: "",
    };
  },
  methods: {
    loadData() {
      const url = `http://localhost:8000/api/fatura/getall`;
      this.load = true; // definir load como verdadeiro antes da chamada da API
      api
        .get(url, {
          // headers: {  // Caso haja autenticação na chamada
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {
          this.faturas = response.data.data;
        })
        .finally(() => {
          this.load = false; // definir load como falso após a chamada da API
        });
    },

    goComents(id) {
      this.url = `#/coments/${id}`; // Recebe o id e o agrega na url que será chamada
    },
  },
  mounted: function () {
    this.loadData();
  },
  computed: {
    filteredfatura() {
      return this.faturas.filter((fatura) =>
        fatura.descricao.toLowerCase().includes(this.search.toLowerCase())
      ); // Filtrar faturas pelo título
    },
  },
});
</script>




<style lang="scss" scoped>
// SCOPED permite aplicar estilisação nesta únicapágina
.faturas-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.fatura-card {
  width: 300px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.fatura-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.fatura-details {
  padding: 20px;
}

.fatura-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.fatura-by {
  color: #666;
  margin-bottom: 10px;
}

.fatura-body {
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






