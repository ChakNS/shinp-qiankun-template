import actions, { initialStates } from './actions'

export default class SharedStatesController {
  constructor() {
    this.handlers = {}
    this.states = Object.assign({}, initialStates)

    actions.onGlobalStateChange((newVals, prevVals) => {
      Object.assign(this.states, newVals)

      Object.entries(this.handlers).forEach(([stateName, handlers]) => {
        if (typeof newVals[stateName] !== 'undefined') {
          handlers.forEach(handler => handler(newVals[stateName], prevVals[stateName]))
        }
      })
    })
  }

  onStateChange(state, handler) {
    if (this.handlers[state]) {
      this.handlers[state].push(handler)
    } else {
      this.handlers[state] = [handler]
    }
  }

  getListeners() {

  }

  removeListener(listener) {

  }

  setState(state, newVal) {
    actions.setGlobalState({
      [state]: newVal
    })
  }

  getStates() {
    return Object.assign({}, this.states)
  }
}
