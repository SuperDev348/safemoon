import React, {useState, useEffect, useMemo} from 'react'
import {
  Container,
  Grid, 
} from '@material-ui/core'

import Nav from '../layout/nav'
import {useStyles} from '../style/material_ui_style'
import {useSetting} from '../../provider/setting'
import PriceInfo from './priceInfo'
import MiddleInfo from './middleInfo'
// import '../style/style.css'

function Home() {
  const [setting] = useSetting()
  const classes = useStyles()

  return (
    <div>
      <Nav />
      {/* ads */}
      <div className="ad" style={{left: 15}}>
        AD
      </div>
      <div className="ad" style={{right: 15}}>
        AD
      </div>
      <div className="content">
        <PriceInfo />
        <MiddleInfo />
        <div 
          style={{ fontSize: 20, textAlign: 'center', padding: 30, color: '#64a0aa', wordWrap: 'break-word'}}
        >
          Buy me a cup of coffee send some safemoon to 0x6159A1544461d7629868950Ba5dd97A84667501c
        </div>
      </div>
    </div>
  )
}
export default Home
