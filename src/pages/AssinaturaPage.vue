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
          placeholder="Buscar assinaturas pela descrição"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <div class="assinaturas-container">
          <div
            v-for="(assinatura, index) in filteredassinatura"
            :key="index"
            style="width: 100%; max-width: 700px"
            class="assinatura-card"
          >
            <div class="assinatura-details">
              <h5 class="assinatura-title">{{ assinatura.descricao }}
                <q-icon name="tv" color="purple" size="1.5em" />
              </h5>
              <p class="assinatura-by">Assinatura ID: {{ assinatura.id }}</p>
              <p class="assinatura-body">Cadastro: {{ assinatura.cadastro }}</p>
              <p class="assinatura-body">Valor: {{ assinatura.valor }}
                <q-icon name="attach_money" color="purple" size="1.5em" />
              </p>
              <p class="assinatura-body">Vencimento: {{ assinatura.vencimento }}
                <q-icon name="calendar_month" color="purple" size="1.5em" />
              </p>
              <p class="assinatura-body">Criado em: {{ assinatura.created_at }}</p>
              <p class="assinatura-body">Atualizado em: {{ assinatura.updated_at }}</p>
              <button class="read-more-link">
                  {{ assinatura.status_fatura }}
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
  name: "assinaturasPage",
  components: {
    TitleComponent,
  },
  data() {
    return {
      assinaturas: [],
      load: false,
      url: "",
      title: "Assinaturas",
      search: "",
    };
  },
  methods: {
    loadData() {
      const url = `http://localhost:8000/api/assinatura/getall`;
      this.load = true; // definir load como verdadeiro antes da chamada da API
      api
        .get(url, {
          // headers: {  // Caso haja autenticação na chamada
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {
          this.assinaturas = response.data.data;
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
    filteredassinatura() {
      return this.assinaturas.filter((assinatura) =>
        assinatura.descricao.toLowerCase().includes(this.search.toLowerCase())
      ); // Filtrar assinaturas pelo título
    },
  },
});
</script>




<style lang="scss" scoped>
// SCOPED permite aplicar estilisação nesta únicapágina
.assinaturas-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.assinatura-card {
  width: 300px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.assinatura-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.assinatura-details {
  padding: 20px;
}

.assinatura-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.assinatura-by {
  color: #666;
  margin-bottom: 10px;
}

.assinatura-body {
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






