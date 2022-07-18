/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component

  interface ComponentCustomProperties {
    $countFormat: any,
  }
}

declare module 'vue3-eventbus'
declare module 'vue3-preview-image'
declare module 'v-contextmenu'
