declare global {
  import c from 'chrome/index'
  const component: DefineComponent<{}, {}, any>
  export default component
}
