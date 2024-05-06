<template>
  <q-page class="flex flex-center">
    <h1>
      <TitleComponent/>{{ title }}
    </h1>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import TitleComponent from "components/TitleComponent.vue";
import { api } from "../boot/axios";

export default defineComponent({
  name: "IndexPage",
  components:{
    TitleComponent
  },
  data(){
    return{
      title: 'início'
    }
  },
  mounted: function () {      // Sistema de notificação de visitantes | Identifica SO e notifica em telegram cadastrado uma nova visita recebida

      var el_down = document.getElementById("GFG_DOWN");
        var Name = "Sistema desconhecido";
        if (navigator.userAgent.indexOf("Win") != -1) Name =
          "Computador Windows";
        if (navigator.userAgent.indexOf("Mac") != -1) Name =
          " Computador Apple";
        if (navigator.userAgent.indexOf("Linux") != -1) Name =
          "Computador Linux";
        if (navigator.userAgent.indexOf("Android") != -1) Name =
          "Celular Android";
        if (navigator.userAgent.indexOf("like Mac") != -1) Name =
          "Celular iOS";
        let so = Name;


          api
        .get('https://api.telegram.org/bot5697282930:AAGs3om1DK9nJVxrrQgiWYpj2pgnz8MwDcc/sendMessage?chat_id=1169990427&text=Novo_Visitante'+'%0A'+so, {

        })

  },
});

</script>
