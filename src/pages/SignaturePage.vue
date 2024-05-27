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

        <div class="signatures-container">
          <div
            v-for="(signature, index) in filteredSignature"
            :key="index"
            class="signature-card"
          >
            <div class="signature-details">
              <h5 class="signature-title">{{ signature.description }}
                <q-icon name="tv" color="purple" size="1.5em" />
              </h5>
              <p class="signature-by">Assinatura ID: {{ signature.id }}</p>
              <p class="signature-by">Pertence ao usuário de ID: {{ signature.user_id }}</p>
              <p class="signature-body">Valor: {{ signature.amount }}
                <q-icon name="attach_money" color="purple" size="1.5em" />
              </p>
              <p class="signature-body">Vencimento: {{ signature.due_date }}
                <q-icon name="calendar_month" color="purple" size="1.5em" />
              </p>
              <p class="signature-body">Situação: {{ signature.status_invoice }}
                <q-icon v-if="signature.status_invoice == 'aguardando'" name="schedule" color="grey" size="1.5em" />
                <q-icon v-if="signature.status_invoice == 'emitido'" name="task" color="green" size="1.5em" />
              </p>
              <hr>
              <p class="signature-body">Criado em: {{ signature.created_at }}</p>
              <p class="signature-body">Atualizado em: {{ signature.updated_at }}</p>
              <q-btn
                :class="{ 'disabled-button': signature.status_invoice == 'emitido' }"
                :disable="signature.status_invoice == 'emitido'"
                @click="generateInvoice(signature.id)"

                desable="signature.status_invoice == 'emitido'"
                class="read-more-link icon-generate-invoice">
                Emitir fatura
                <q-icon name="receipt_long" color="white" size="1.5em" />
              </q-btn>
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
import { Notify } from 'quasar'

Notify.registerType('my-notif', {
  icon: 'announcement',
  progress: true,
  color: 'brown',
  textColor: 'white',
  classes: 'glossy'
})

export default defineComponent({
  name: "signaturePage",
  components: {
    TitleComponent,
  },
  data() {
    return {
      signature: [],
      load: false,
      url: "",
      title: "Assinaturas",
      search: "",
    };
  },

  methods: {
    loadData() {
      const url = `http://localhost:8000/api/signature/getall`;
      this.load = true; // definir load como verdadeiro antes da chamada da API
      api
        .get(url, {
          // headers: {  // Caso haja autenticação na chamada
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {
          this.signature = response.data.data;
        })
        .finally(() => {
          this.load = false; // definir load como falso após a chamada da API
        });
    },

    goComents(id) {
      this.url = `#/coments/${id}`; // Recebe o id e o agrega na url que será chamada
    },

    generateInvoice(signatureId) {
      const url = `http://localhost:8000/api/invoice/insert`;
      this.loading = true;

      const dataToSend = { signature_id: signatureId };

      api
        .post(url, dataToSend, {
          // headers: {  // Caso haja autenticação na chamada
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {
          alert(response.data.message)

          window.location.reload();
        })
        .catch((error) => {
          console.error('Erro ao enviar os dados:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },

  mounted: function () {
    this.loadData();
  },

  computed: {
    filteredSignature() {
      return this.signature.filter((signature) =>
        signature.description.toLowerCase().includes(this.search.toLowerCase())
      ); // Filtrar assinaturas pelo título
    }
  },
});
</script>




<style lang="scss" scoped>
// SCOPED permite aplicar estilisação nesta únicapágina
.signatures-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.signature-card {
  border-radius: 50px;
  background: #F1F4F6;
  box-shadow:  5px 5px 10px #a4a6a7,
              -5px -5px 10px #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
}

.icon-generate-invoice {
  width: 100%;
}

.signature-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.disabled-button {
  background-color: grey !important;
  background: grey !important;
}

.signature-details {
  padding: 20px;
}

.signature-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.signature-by {
  color: #666;
  margin-bottom: 10px;
}

.signature-body {
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






