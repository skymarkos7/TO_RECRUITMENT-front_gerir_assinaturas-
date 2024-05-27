<template>
  <q-page>
    <h4 style="margin:30px">
      <TitleComponent/>{{ title }}
    </h4>

    <a href="#/user" style="text-decoration: none"
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
      <div class="posts-container userdetails">
        <q-btn title="apagar usuário" @click="deleteUser(user.id)" class="float-right delete-btn">
          <q-icon name="delete" color="red" size="1.5em" />
        </q-btn>
        <q-btn title="editar usuário" @click="editing = !editing" class="float-right delete-btn">
          <q-icon name="edit" color="green" size="1.5em" />
        </q-btn>
        <div style="width: 100%; max-width: 800px" class="post-card">
          <div class="post-details">
            <h5 class="post-title">
              {{ user.name }}
              <q-icon name="person" color="teal" size="8em" />
            </h5>
            ID: #{{ user.id }}
            <a
              style="text-decoration: none; color: black"
              :href="'mailto:' + user.mail"
              >.<br />
              <p class="post-body">
                <q-icon name="mail" color="teal" size="2em" />
                {{ user.mail }}
              </p>
            </a>
            <a
              style="text-decoration: none; color: black"
              :href="'tel:' + user.phone"
              ><p class="post-body">
                <q-icon name="phone" color="teal" size="2em" />
                {{ user.phone }}
              </p></a
            >
            <p class="post-body">
                <q-icon name="add_circle" color="teal" size="2em" />
               Criado em: {{ user.created_at }}
            </p>
            <p class="post-body">
              <q-icon name="update" color="teal" size="2em" />
              Atualizado em: {{ user.updated_at }}
            </p>

          </div>
        </div>
      </div>
    </div>
    <q-card v-if="editing" class="card-container">
      <div class="container-form">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="user.name"
            label="Nome do usuário *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type name']"
          />

          <q-input
            filled
            v-model="user.phone"
            label="(99) 9999-9999 *"
            lazy-rules
            :rules="[
              val => !!val || 'Please type phone',
              val => /^\(\d{2}\) \d{5}-\d{4}$/.test(val) || 'Phone must be in the format (XX) XXXXX-XXXX'
            ]"
          />

          <q-input
            filled
            type="email"
            v-model="user.mail"
            label="Email *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type your email']"
          />

          <div class="div-btn" >
            <q-btn class="btn-form" label="Salvar" type="submit" color="primary"/>
          </div>
        </q-form>
      </div>
    </q-card>
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
      user: [],
      load: false,
      title: 'detalhes de um usuário',
      editing: false,
      mail: '',
      name: '',

    };
  },
  setup() {
    return {
      tab: ref("one"),
    };
  },
  methods: {
    onSubmit () {
      const url = `http://localhost:8000/api/user/update/${this.user.id}`;
      this.loading = true;

      const dataToSend = {
        name: this.user.name,
        mail: this.user.mail,
        phone: this.user.phone,
      };

      api
        .put(url, dataToSend, {
          // headers: {  // Caso haja autenticação na chamada
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {
          alert('Atualizado com sucesso!')

        })
        .catch((error) => {

          console.error(error.response.data.message);
          alert(error.response.data.message)
        })
        .finally(() => {
          this.loading = false;
        });
    },

    loadData() {
      let id = this.$route.params.id;
      const url = `http://localhost:8000/api/user/get/${id}`;
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

    deleteUser(id) {
      const url = `http://localhost:8000/api/user/delete/${id}`;
      this.load = true; // define load como verdadeiro antes da chamada da API
      api
        .delete(url, {
        })
        .then((response) => {

          this.user = response.data.data;

          window.location.href = '#/user';

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
});
</script>




<style lang="scss" scoped>
// SCOPED permite aplicar estilisação nesta únicapágina
.userdetails {
  border-radius: 50px;
  background: #ededee;
  box-shadow: 20px 20px 60px #c9c9ca, -20px -20px 60px #ffffff;

  margin-bottom: 50px;
  padding: 10px;
}
.card-user {
  width: 100%;
  max-width: 250px;
}

.card-container {
  display: flex;
  justify-content: center;
  background-color: #F1F4F6;
}

.container-form {
  border-radius: 26px;
  background: #F1F4F6;
  box-shadow: inset 5px 5px 4px #606262,
              inset -5px -5px 4px #ffffff;

  min-width: 50%;
}

.btn-form{
  border-radius: 26px;
  background: #6688DF;
  box-shadow: inset 5px 5px 4px #293659,
              inset -5px -5px 4px #a3daff;

  width: 150px;
}

.user-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.div-btn {
  display: flex;
  justify-content: center;
}

.delete-btn{
  margin: 10px;
  border-radius: 15px;
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






