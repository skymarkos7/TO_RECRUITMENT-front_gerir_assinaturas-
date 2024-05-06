const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/assinaturas", component: () => import("pages/AssinaturaPage.vue") },
      { path: "/cadastros", component: () => import("pages/CadastroPage.vue") },
      { path: "/faturas", component: () => import("pages/FaturasPage.vue") },
      {
        path: "/details/:id",
        component: () => import("pages/DetailsUser.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
