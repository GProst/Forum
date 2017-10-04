import React from 'react'
import {Link} from 'react-router-dom'

import {Routes} from '../../../routes'

export default () => (
  <div>
    Messages page!
    <Link to={Routes.createMessage}>Create Message</Link>
  </div>
)
