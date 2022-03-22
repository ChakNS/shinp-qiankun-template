import SharedStatesController from './SharedStatesController'

const sharedStatesController = new SharedStatesController()

sharedStatesController.setState('shareData', 'Tom And Jerry')

sharedStatesController.onStateChange('shareData', data => {
  console.log('change shareData', data)
})

export default sharedStatesController
