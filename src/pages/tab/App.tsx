import { computed, defineComponent, onActivated, onMounted, ref } from 'vue'
import './tab.scss'
import {
  getBingImg,
  handlerNetWorkUrl,
  handlerSearchEngines,
  handlerSearchValueShowPreFix,
  matchUrl
} from '@/utils/utils'
import { changeTheme } from '@/utils/theme'

export default defineComponent({
  name: 'App',
  setup() {
    const searchInput = ref<HTMLInputElement>()
    const imgUrl = ref<string>('')

    const showPreFix = ref<boolean>(false)
    const preFixContent = ref<string>('')
    const searchValue = ref<string>('')

    changeTheme()

    getBingImg().then((res) => (imgUrl.value = res))

    handlerSearchValueShowPreFix(searchValue, showPreFix, preFixContent)

    onMounted(() => {
      searchInput.value?.focus()
    })

    // chrome.history.search(
    //   {
    //     text: ''
    //   },
    //   (results) => {
    //     console.log(results)
    //   }
    // )
    const dateTime = new Date()
    const port = chrome.runtime.connect({
      name: `Tab${dateTime}`
    })

    port.onMessage.addListener(() => {
      changeTheme()
    })

    const handlerKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        searchValue.value = searchValue.value.trim()
        if (searchValue.value == '') return
        if (matchUrl(searchValue.value)) {
          const openUrl = handlerNetWorkUrl(searchValue.value)
          window.open(openUrl)
          return
        }
        if (showPreFix.value) {
          const url = handlerSearchEngines(preFixContent.value, searchValue.value)
          window.open(url)
          return
        }
        window.open(`http://www.google.com/search?q=${searchValue.value}`)
      }

      if (searchValue.value === '' && event.key === 'Backspace') {
        showPreFix.value = false
      }
    }

    const placeholderVal = computed(() =>
      showPreFix.value ? '请输入搜索内容' : '在Google中搜索 或输入网址'
    )

    return () => (
      <div class="tabMain" style={{ 'background-image': `url(${imgUrl.value})` }}>
        <div class="title">Simple</div>
        <div class="search">
          <div v-show={showPreFix.value} class="prefix">
            {preFixContent.value}
          </div>
          <input
            type="text"
            ref={searchInput}
            v-model={searchValue.value}
            onKeydown={handlerKeyDown.bind(this)}
            placeholder={placeholderVal.value}
          />
        </div>
      </div>
    )
  }
})
