import {makeStyles} from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    textTransform: 'none !important',
    outline: 'none !important',
  },
  panel: {
    border: 'solid 1px #e6cbcb',
    borderRadius: 5,
    padding: 20
  },
  title: {
    fontSize: 25,
    padding: 5
  },
  earningItem: {
    fontSize: 20,
    padding: 2
  },
  walletItem: {
    fontSize: 22,
    padding: 10,
    textAlign: 'center'
  },
  marketItem: {
    fontSize: 20,
    padding: 2
  },
  middle: {
    height: 400
  },
  price: {
    fontSize: 20
  },
  twitter: {
    height: 300
  }
}))