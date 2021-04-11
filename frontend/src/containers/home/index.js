import React, {useState, useEffect, useMemo} from 'react'
import {
  Container,
  Grid, 
} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"

import Nav from '../layout/nav'
import {useSetting} from '../../provider/setting'
import PriceInfo from './priceInfo'
import MiddleInfo from './middleInfo'

const useStyles = makeStyles((theme) => ({
  panel: {
    border: 'solid 1px #e6cbcb',
    borderRadius: 5,
    padding: 20
  },
  price: {
    height: 150,
    fontSize: 35
  },
}))

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
          style={{ fontSize: 20, textAlign: 'center', padding: 30, color: '#3f51b5'}}
        >
          Buy me a cup of coffee send some safemoon to 0x6159A1544461d7629868950Ba5dd97A84667501c
        </div>
      </Container>
    </div>
  )
}
export default Home
