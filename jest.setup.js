// jest.setup.js

import '@testing-library/jest-dom/extend-expect'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

globalThis.IS_REACT_ACT_ENVIRONMENT = true
expect.extend({ toMatchImageSnapshot })

window.HTMLMediaElement.prototype.load = () => {
  /* do nothing */
}
window.HTMLMediaElement.prototype.play = () => {
  /* do nothing */
}
window.HTMLMediaElement.prototype.pause = () => {
  /* do nothing */
}
window.HTMLMediaElement.prototype.addTextTrack = () => {
  /* do nothing */
}
