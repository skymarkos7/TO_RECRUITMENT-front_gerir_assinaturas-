<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Desafio de assinaturas
        </q-toolbar-title>

        <a target='_blank' style="text-decoration:none; color: aliceblue;" href="https://www.linkedin.com/in/skymarkos7/"><div>Marcos Lourenço</div></a>
      </q-toolbar>
    </q-header>
s
    <q-drawer
    style="background-color: #f5f5f5;"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list >

        <EssentialLink

          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    icon: 'home',
    href: '/',
    target:"_self"
  },
  {
    title: 'Usuario',
    caption: 'Listagem de usuários',
    icon: 'group',
    href: '#/user',
    target:"_self"
  },
  {
    title: 'Assinaturas',
    caption: 'Listagem de assinaturas',
    icon: 'live_tv',
    href: '#/signature',
    target:"_self"
  },
  {
    title: 'Faturas',
    caption: 'Listagem de faturas',
    icon: 'document_scanner',
    href: '#/invoice',
    target:"_self"
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style>
body{
  background-color:#f1f4f6 ;
}
</style>
