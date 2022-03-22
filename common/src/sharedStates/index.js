/**
 * 访问应用间的共享数据
 * 通过 $sharedStates 获取
 */

export const sharedStates = (props) => {
  return {
    install (app) {
      const $sharedStates = {
        set(stateName, value) {
          if (props.setGlobalState) {
            props.setGlobalState({ [stateName]: value })
          } else {
            console.error('[$sharedStates]: 应用中不存在setGlobalState方法，请确认该应用是否在主应用下运行')
          }
        }
      }
      app.provide('$sharedStates', $sharedStates)

      if (props && props.onGlobalStateChange) {
        props.onGlobalStateChange(state => {
          Object.assign($sharedStates, state)
        }, true)
      }
    }
  }
}
