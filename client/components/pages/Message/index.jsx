import React from 'react'
import {Link} from 'react-router-dom'

import {Routes} from '../../../routes'

export default () => (
  <div>
    Message page!
    <Link to={Routes.messagesList}>Go to messages list</Link>
  </div>
)
