import Immutable from 'immutable'
import generateActionNames from '../utils/actionNames'
import { createReducer, fetchReducer, updateReducer, deleteReducer } from '../reducers'

const reducer = (config) => {

  if (!config.eventPrefix) throw new Error('clerk.reducer: Expected eventPrefix')
  if (!config.uid) throw new Error('clerk.reducer: Expected uid')

  // Generate action names for create, fetch, update, delete
  const createActions = generateActionNames(config.eventPrefix, 'create')
  const fetchActions = generateActionNames(config.eventPrefix, 'fetch')
  const updateActions = generateActionNames(config.eventPrefix, 'update')
  const deleteActions = generateActionNames(config.eventPrefix, 'delete')

  const defaultState = Immutable.fromJS({

    // raw: Contains raw data objects
    // {
    //   123: { ... },
    //   234: { ... }
    // }
    raw: {}
  })

  // Clerk reducer
  return (state = {}, action) => {

    // Extend existing state
    // This comes into play when clerk is used to extend an existing reducer
    state = state.merge(defaultState)

    switch(action) {
      case fetchActions.success: return fetchReducer.success(state, action)
      case createActions.start: return createReducer.start(state, action)
      case updateActions.start: return updateReducer.start(state, action)
      case deleteActions.start: return deleteReducer.start(state, action)
      default: return state
    }
  }
}

export default reducer