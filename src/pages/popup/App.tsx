import { ref } from 'vue'

import './popup.scss'
import { changeTheme, setModelTheme } from '@/utils/theme'
import { Exterior } from '@/enum'
import { getExteriorDisplacement, getExteriorForStorage } from '@/utils/enumUtils'

const exterior = await getExteriorForStorage()
const leftPosition: string = getExteriorDisplacement(exterior)
const leftSetp = ref<string>(leftPosition)
const currentModel = ref<Exterior>(exterior)
const port = chrome.runtime.connect({
  name: 'Popup'
})

changeTheme()

const changeModel = (model: Exterior) => {
  currentModel.value = model
  leftSetp.value = getExteriorDisplacement(model)
  setModelTheme(model)
  port.postMessage('changeTheme')
  changeTheme()
}

const currentActive = (model: Exterior) => (model == currentModel.value ? 'active' : '')

const App = () => {
  return (
    <div class="popupMain">
      <div class="switchBox">
        <div class={currentActive(Exterior.Light)} onClick={() => changeModel(Exterior.Light)}>
          浅色
        </div>
        <div class={currentActive(Exterior.Dark)} onClick={() => changeModel(Exterior.Dark)}>
          深色
        </div>
        <div class={currentActive(Exterior.Auto)} onClick={() => changeModel(Exterior.Auto)}>
          自动
        </div>
        <span style={{ left: leftSetp.value }}></span>
      </div>
      <div class="footer">@ 2024 Miliky</div>
    </div>
  )
}

export default App
