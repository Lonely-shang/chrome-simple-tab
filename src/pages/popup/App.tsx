import { computed, ref } from 'vue'

import './popup.scss'

enum Model {
  White = 0,
  Black = 100 / 3,
  Auto = (100 / 3) * 2
}

const leftSetp = ref<string>('66.6666%')
const currentModel = ref<Model>(Model.Auto)

const changeModel = (model: Model) => {
  console.log(model)
  currentModel.value = model
  leftSetp.value = model + '%'
}

const currentActive = (model: Model) => (model == currentModel.value ? 'active' : '')

const App = () => {
  return (
    <div class="popupMain">
      <div class="switchBox">
        <div class={currentActive(Model.White)} onClick={() => changeModel(Model.White)}>
          浅色
        </div>
        <div class={currentActive(Model.Black)} onClick={() => changeModel(Model.Black)}>
          深色
        </div>
        <div class={currentActive(Model.Auto)} onClick={() => changeModel(Model.Auto)}>
          自动
        </div>
        <span style={{ left: leftSetp.value }}></span>
      </div>
      <div class="footer">@ 2024 Miliky</div>
    </div>
  )
}

export default App
