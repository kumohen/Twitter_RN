import { combineReducers } from 'redux'

import auth from "./auth"
import post from "./cart"

export default combineReducers({
  auth,post
  
})