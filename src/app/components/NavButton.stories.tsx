import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { BrowserRouter as Router } from "react-router-dom"

import NavButton from './NavButton'
import Button from '@material-ui/core/Button';

export const task = {
  id: '1',
  title: 'Test Task',
  state: 'TASK_INBOX',
  updatedAt: new Date(2018, 0, 1, 9, 0),
}

export const actions = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
}

storiesOf('Task2', module)
  .add('default', () => (
    <Button>
      1234
      </Button>
  ))