import { ref } from 'vue'
import './options.scss'
import { changeTheme, setModelTheme } from '@/utils/theme'
import { Exterior } from '@/enum'
import { getExteriorForStorage } from '@/utils/enumUtils'

// const exterior = await getExteriorForStorage()

const active = ref<Exterior>(1)

// changeTheme()

const isActive = (model: Exterior) => (model == active.value ? 'active' : '')

const modelClick = (model: Exterior) => {
  active.value = model
  setModelTheme(model)
}

const App = () => {
  return (
    <div class="optionsBody">
      <h1>Simple Tab扩展程序选项</h1>
      <div class="optionsMain modelSelect">
        <div onClick={() => modelClick(Exterior.Light)} class={isActive(Exterior.Light)}>
          浅色
        </div>
        <div onClick={() => modelClick(Exterior.Dark)} class={isActive(Exterior.Dark)}>
          深色
        </div>
        <div onClick={() => modelClick(Exterior.Auto)} class={isActive(Exterior.Auto)}>
          跟随系统
        </div>
      </div>
      <div class="optionsMain urlListBox">
        <ul class="urlList">
          <li>
            <div>sd </div>
            <div>djaf</div>
            <div>dsjaf</div>
          </li>
          <li>aaaa</li>
          <li>aaaa</li>
          <li>aaaa</li>
        </ul>
      </div>
    </div>
  )
}

export default App
