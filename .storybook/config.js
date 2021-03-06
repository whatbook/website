import { configure } from '@storybook/react'
import requireContext from 'require-context.macro'
import '../src/index.css'

// automatically import all files ending in *.stories.js
const req = requireContext('../src', true, /.(stories.js|stories.tsx)$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
