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
      <div class="fa fa-spinner container-invoice fa-spin flex flex-center" v-if="!load">
        <div
            v-for="(invoice, index) in filteredInvoice"
            :key="index"
            class="signature-card"
        >
          <div class="boleto">
            <div class="topo">
              <div class="logo">{{ invoice.description}}</div>
            </div>
            <div class="dados">
              <div class="info">Beneficiário: {{ invoice.description }}</div>
              <div class="info">id: {{ invoice.id}}</div>
              <div class="info">Valor: R$ {{ invoice.amount }}</div>
              <div class="info">Situação: {{ invoice.status }}</div>
            </div>
            <div class="linha"></div>
            <div class="rodape">
              <div class="info">Vencimento: {{ invoice.due_date}}</div>
              <div class="info">Código do Boleto: 123456789012345678901234567890</div>
              <img src="https://pngimg.com/d/barcode_PNG47.png" height="40" width="250" alt="code-bar">
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
  name: "InvoicePage",
  components: {
    TitleComponent,
  },
  data() {
    return {
      invoice: [],
      load: false,
      url: "",
      title: "Faturas",
      search: "",
    };
  },
  methods: {
    loadData() {
      const url = `http://localhost:8000/api/invoice/getall`;
      this.load = true; // definir load como verdadeiro antes da chamada da API
      api
        .get(url, {
          // headers: {  // Caso haja autenticação na chamada
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {
          this.invoice = response.data.data;
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
    filteredInvoice() {
      return this.invoice.filter((invoice) =>
        invoice.description.toLowerCase().includes(this.search.toLowerCase())
      ); // Filtrar faturas pelo título
    },
  },
});
</script>




<style lang="scss" scoped>
// SCOPED permite aplicar estilisação nesta únicapágina
.invoice-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.invoice-card {
  width: 300px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.invoice-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.invoice-details {
  padding: 20px;
}

.invoice-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.invoice-by {
  color: #666;
  margin-bottom: 10px;
}

.invoice-body {
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

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.signature-card {
  border-radius: 5px;
  background: #F1F4F6;
  box-shadow:  5px 5px 10px #a4a6a7,
              -5px -5px 10px #ffffff;

  width: 300px;
  height: 353px;
  margin: 50px;
  border: 1px solid #000;
  padding: 20px;
  box-sizing: border-box;
}

.signature-card:hover{
  border-radius: 5px;
  background: #F1F4F6;
  box-shadow:  50px 50px 100px #87898a,
              -50px -50px 100px #ffffff;
}

.topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  font-size: 18px;
  font-weight: bold;
}

.codigo-barras {
  font-family: monospace;
}

.dados {
  margin-bottom: 20px;
}

.info {
  margin-bottom: 10px;
}

.linha {
  border-top: 1px solid #000;
  margin: 20px 0;
}

.rodape {
  font-size: 14px;
}

/* Estilo fictício do código de barras */
.codigo-barras {
  font-size: 12px;
  overflow: hidden;
}

</style>






