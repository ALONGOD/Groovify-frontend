import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Button, Popup } from 'semantic-ui-react'

export function PopupDelay({ content, btnContent }) {
  const btnIcon =
    content === 'Go Back' ? <IoIosArrowBack /> : <IoIosArrowForward />
  var btn = btnIcon

  return (
    <Popup
      content="Popup will hide in 500ms after leaving mouse."
      mouseEnterDelay={500}
      mouseLeaveDelay={500}
      on="hover"
      trigger={<btn onClick={() => navigation(1)} />}
    />
  )
}
