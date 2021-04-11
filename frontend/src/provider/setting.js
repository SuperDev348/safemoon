import * as React from 'react'

const SettingContext = React.createContext()

function settingReducer(state, action) {
  switch (action.type) {
    case 'SET': {
      console.log(action)
      return {...state, [action.settingName]: action.settingData}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const SettingProvider = (props) => {
  const [setting, dispatch] = React.useReducer(settingReducer, {price: 0, maxPrice: 0, minPrice: 0, walletId: ''})
  console.log(setting)
  return <SettingContext.Provider value={[setting, dispatch]} {...props} />
}

export const useSetting = () => {
  const context = React.useContext(SettingContext)
  if (!context) {
    throw new Error('useSetting must be used within a SettingProvider')
  }
  return context
}