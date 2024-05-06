<template>
  <q-page>
    <h4 style="margin:30px">
      <TitleComponent/>{{ title }}
    </h4>

    <a href="#/cadastros" style="text-decoration: none"
      ><q-btn
        style="margin-left: 20px; background: #ff0080; color: white"
        icon="arrow_back"
        label="Voltar"
    /></a>

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
      <div class="posts-container cadastrodetails">
        <div style="width: 100%; max-width: 800px" class="post-card">
          <div class="post-details">
            <h5 class="post-title">
              {{ cadastros.nome }} -
              {{ cadastros.id }}
              <q-icon name="person" color="teal" size="8em" />
            </h5>

            <p class="post-by">
              <q-icon name="tag" color="teal" size="2em" />
              Código: {{ cadastros.codigo }}
            </p>
            <a
              style="text-decoration: none; color: black"
              :href="'mailto:' + cadastros.email"
              >.<br />
              <p class="post-body">
                <q-icon name="mail" color="teal" size="2em" />
                {{ cadastros.email }}
              </p>
            </a>
            <a
              style="text-decoration: none; color: black"
              :href="'tel:' + cadastros.phone"
              ><p class="post-body">
                <q-icon name="phone" color="teal" size="2em" />
                {{ cadastros.telefone }}
              </p></a
            >
            <p class="post-body">
                <q-icon name="add_circle" color="teal" size="2em" />
               Criado em: {{ cadastros.created_at }}
            </p>
            <p class="post-body">
              <q-icon name="update" color="teal" size="2em" />
              Atualizado em: {{ cadastros.updated_at }}
            </p>

          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";
import { ref } from "vue";
import TitleComponent from "components/TitleComponent.vue";

export default defineComponent({
  name: "DetailsUser",
  components: {
    TitleComponent
  },
  data() {
    return {
      cadastros: [],
      load: false,
      title: 'detalhes de um usuário'
    };
  },
  setup() {
    return {
      tab: ref("one"),
    };
  },
  methods: {
    loadData() {
      let id = this.$route.params.id;
      const url = `http://localhost:8000/api/cadastro/get/${id}`;
      this.load = true; // define load como verdadeiro antes da chamada da API
      api
        .get(url, {
        })
        .then((response) => {

          this.cadastros = response.data.data;
          // this.address = response.data.address;
          // this.company = response.data.company;
        })
        .finally(() => {
          this.load = false; // define load como falso após a chamada da API
        });
    },
  },
  mounted: function () {

    this.loadData();
  },
});
</script>




<style lang="scss" scoped>
// SCOPED permite aplicar estilisação nesta únicapágina
.cadastrodetails {
  border-radius: 50px;
  background: #ededee;
  box-shadow: 20px 20px 60px #c9c9ca, -20px -20px 60px #ffffff;

  margin-bottom: 50px;
  padding: 10px;
}
.card-cadastro {
  width: 100%;
  max-width: 250px;
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






