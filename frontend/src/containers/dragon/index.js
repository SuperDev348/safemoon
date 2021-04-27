import React, {useState, useEffect, useMemo} from 'react'
import {
  Container,
  Grid, 
} from '@material-ui/core'
import {NotificationManager} from 'react-notifications'

import {useSetting} from '../../provider/setting'
import {getCookie} from '../../service/cookie'
import Nav from '../layout/nav'
import {useStyles} from '../style/material_ui_style'
import PriceInfo from './priceInfo'
import MiddleInfo from './middleInfo'
import PriceHistory from './priceHistory'

function SpaceDragon() {
  const [setting, dispatch] = useSetting()
  const classes = useStyles()

  useEffect(() => {
    const walletId = getCookie('dragonWalletId')
    dispatch({type: 'SET', settingName: 'walletId', settingData: walletId})
    if (walletId === '')
      NotificationManager.error('Enter wallet id to start using the site', 'Error', 20000)
  }, [])

  return (
    <div>
      <Nav />
      {/* ads */}
      <div className="ad" style={{left: 0}}>
      
      </div>
      <div className="ad" style={{right: 0}}>
        
      </div>
      <div className="content">
        {/* <PriceHistory />
        <PriceInfo /> */}
        <MiddleInfo />
        <div 
          style={{ fontSize: 20, textAlign: 'center', padding: 30, color: '#64a0aa', wordWrap: 'break-word'}}
        >
          Buy me a cup of coffee send some space dragon to 0x6159A1544461d7629868950Ba5dd97A84667501c
        </div>
      </div>
    </div>
  )
}
export default SpaceDragon
