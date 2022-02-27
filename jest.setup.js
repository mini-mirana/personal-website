// jest.setup.js

import '@testing-library/jest-dom/extend-expect'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { expect } from '@playwright/test'

expect.extend({ toMatchImageSnapshot })
