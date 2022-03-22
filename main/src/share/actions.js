import { initGlobalState } from 'qiankun'

const initialStates = {}
const actions = initGlobalState(initialStates)

export default actions

export { initialStates }
