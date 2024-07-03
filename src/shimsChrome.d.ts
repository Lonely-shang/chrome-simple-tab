declare global {
  import c from 'chrome/index'
  const component: DefineComponent<{}, {}, any>

  declare let window: Window & typeof globalThis

  export default component
}
