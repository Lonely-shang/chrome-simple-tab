import { defineComponent, ref } from 'vue'
import './options.scss'
import { changeTheme, setModelTheme } from '@/utils/theme'
import { Exterior } from '@/enum'
import { getExteriorForStorage } from '@/utils/enumUtils'
import { initData } from '@/config'
import lightImg from '@/assets/light.png'
import darkImg from '@/assets/dark.png'
import autoImg from '@/assets/auto.png'

// const exterior = await getExteriorForStorage()

export default defineComponent({
  name: 'App',
  setup() {
    const colorList: string[] = []

    const active = ref<Exterior>(1)

    changeTheme()

    const isActive = (model: Exterior) => (model == active.value ? 'active' : '')

    const dateTime = new Date()
    const port = chrome.runtime.connect({
      name: `Options${dateTime.getTime()}`
    })

    port.onMessage.addListener(async () => {
      changeTheme()
    })

    const modelClick = (model: Exterior) => {
      active.value = model
      setModelTheme(model)
      port.postMessage('changeTheme')
    }

    const rgb = () => {
      const r = Math.floor(Math.random() * 256)
      const g = Math.floor(Math.random() * 256)
      const b = Math.floor(Math.random() * 256)
      return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
    }

    for (let index = 0; index < 100; index++) {
      colorList.push(rgb())
    }

    return () => (
      <div class="optionsBody">
        <h1>Simple Tab扩展程序选项</h1>
        <div class="optionsMain modelSelect">
          <div class="title">外观</div>
          <div onClick={() => modelClick(Exterior.Light)} class={isActive(Exterior.Light)}>
            <img src={lightImg} alt="" srcset="" />
          </div>
          <div onClick={() => modelClick(Exterior.Dark)} class={isActive(Exterior.Dark)}>
            <img src={darkImg} alt="" srcset="" />
          </div>
          <div onClick={() => modelClick(Exterior.Auto)} class={isActive(Exterior.Auto)}>
            <img src={autoImg} alt="" srcset="" />
          </div>
        </div>
        <div class="optionsMain customerWindow">
          <div class="title">自定义窗口</div>
          <span>网络地址：</span>
          <input type="text" spellcheck="false" />
          <span>
            是否启用：
            <input type="checkbox" class="checkbox" />
          </span>
        </div>
        <div class="optionsMain urlListBox">
          <div class="title">网络搜索</div>
          <ul class="urlList">
            {initData.map((item, index) => {
              return (
                <li key={item.title}>
                  <div class="icon" style={{ backgroundColor: colorList[index] }}>
                    {item.title[0].toUpperCase()}
                  </div>
                  <div class="content">{item.title}</div>
                  <div class="content">{item.keyword}</div>
                </li>
              )
            })}
          </ul>
          <span class="addIcon">+</span>
        </div>
      </div>
    )
  }
})
