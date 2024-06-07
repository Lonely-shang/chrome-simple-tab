export const getBingEnvUrl = () => {
  const env = import.meta.env
  return env.MODE == 'development' ? '/bing' : 'https://cn.bing.com'
}
