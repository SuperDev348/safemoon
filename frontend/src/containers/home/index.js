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

function Home() {
  const [setting] = useSetting()
  const classes = useStyles()

  return (
    <div>
      <Nav />
      <Container maxWidth="lg">
        <Grid container spacing={3} style={{paddingTop: 100}}>
          <Grid item xs={12}>
            <Grid 
              className={`${classes.panel} ${classes.price}`}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <PriceInfo />
            </Grid>
          </Grid>
          <MiddleInfo />
        </Grid>
        <div 
          style={{ fontSize: 20, textAlign: 'center', padding: 30, color: '#3f51b5', wordWrap: 'break-word'}}
        >
          Buy me a cup of coffee send some safemoon to 0x6159A1544461d7629868950Ba5dd97A84667501c
        </div>
      </Container>
    </div>
  )
}
export default Home
