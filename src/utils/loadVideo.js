export const loadVideo = (src) =>
  new Promise((resolve, reject) => {
    if (src === '') {
      resolve('')
    }
    const vid = document.createElement('video')
    vid.onloadeddata = () => resolve(vid)
    vid.onerror = reject
    vid.src = src
    vid.crossOrigin = 'Anonymous'
  })

export default loadVideo
