import { computed, defineComponent, onMounted, ref, Transition } from 'vue'
import './tab.scss'
import {
  getBingImg,
  getCustomerConf,
  handlerNetWorkUrl,
  handlerSearchEngines,
  handlerSearchValueShowPreFix,
  matchUrl
} from '@/utils/utils'
import { changeTheme } from '@/utils/theme'
import icon from '@/assets/icon.svg'
import { Bounce, gsap } from 'gsap'

export default defineComponent({
  name: 'App',
  setup() {
    let index: number = 0
    const iframeUrl = ref<string>('')
    const showIframe = ref<boolean>(false)
    const searchTips = ref<boolean>(false)
    const searchInput = ref<HTMLInputElement>()
    const imgUrl = ref<string>('')

    const showPreFix = ref<boolean>(false)
    const preFixContent = ref<string>('')
    const searchValue = ref<string>('')

    changeTheme()

    getBingImg().then((res) => {
      imgUrl.value = res
      animated()
    })

    const callBack: callBackFun = (searchVal: string) => {
      console.log(searchVal)
      if (searchVal.trim().length > 0) {
        searchTips.value = true
        return
      }
      searchTips.value = false
    }

    handlerSearchValueShowPreFix(searchValue, showPreFix, preFixContent, callBack)

    // TODO 历史记录
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
      name: `Tab${dateTime.getTime()}`
    })

    port.onMessage.addListener(() => {
      changeTheme()
    })

    const handlerKeyDown = (event: KeyboardEvent) => {
      if (event.key == 'Tab') {
        event.preventDefault()
      }

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
        if (index === 1) {
          index = 0
          showPreFix.value = false
        } else {
          index = 1
          const time = setTimeout(() => {
            index = 0
            clearTimeout(time)
          }, 300)
        }
      }
    }

    const placeholderVal = computed(() =>
      showPreFix.value ? '请输入搜索内容' : '在Google中搜索 或输入网址'
    )

    function handlerShowIframe(): void {
      showIframe.value = false
    }

    document.addEventListener('keydown', async (e: KeyboardEvent) => {
      const customerWindowConf = await getCustomerConf()
      if (!customerWindowConf.isEnable) {
        e.preventDefault()
        return
      }
      if (iframeUrl.value != customerWindowConf.urlInputStr) {
        iframeUrl.value = customerWindowConf.urlInputStr
      }
      if (e.altKey && e.key === 'o') {
        showIframe.value = !showIframe.value
      }
    })

    onMounted(() => {
      gsap.set('.search', { y: -100 })
      gsap.set('.common', { y: -500 })
      gsap.set('.title', { y: -1000 })
    })

    const animated = () => {
      const timeline = gsap.timeline()
      timeline
        .to('.search', { y: 30, duration: 2 })
        .fromTo(
          '.common',
          {
            y: -500,
            yoyo: true
          },
          {
            y: 0,
            duration: 1.8,
            yoyo: true,
            ease: 'power4.out'
          },
          '<'
        )
        .to('.common', { y: -550, duration: 0.5, ease: 'back.out' })
        .to(
          '.search',
          {
            y: '400',
            duration: 1,
            ease: Bounce.easeOut
          },
          '<'
        )
        .set('.a', {
          filter: 'none',
          backgroundColor: 'transparent'
        })
        .to('.search', {
          width: '40%',
          minWidth: 600,
          duration: 1,
          filter: 'none'
        })
        .to(
          '.title',
          {
            y: 200,
            duration: 1
          },
          '>'
        )
    }

    return () => (
      //
      <div class="tabMain" style={{ 'background-image': `url(${imgUrl.value})` }}>
        <div class="a">
          <div class="title">Simple</div>
          <div class="common"></div>
          <div class="search">
            <div class="search-wrap">
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

            <Transition name="toast">
              <div class="searchList" v-show={searchTips.value}>
                <ul>
                  {/* <ListItem></ListItem>
                <ListItem></ListItem>
                <ListItem></ListItem>
                <ListItem></ListItem>
                <ListItem></ListItem> */}
                </ul>
              </div>
            </Transition>
          </div>
          <Transition name="iframe">
            <div class="tabMain-wrap" v-show={showIframe.value}>
              <div class="tabMain-wrap-icon" onClick={() => handlerShowIframe()}>
                <img src={icon} />
              </div>
              <iframe class="tabMain-wrap-iframe" src={iframeUrl.value}></iframe>
            </div>
          </Transition>
        </div>
      </div>
    )
  }
})
