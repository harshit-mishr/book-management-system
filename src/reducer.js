import { combineReducers } from "redux";
import { actions } from "./action";
import { intialData  } from "./BookData";

export const AddReducer = (state = intialData, action) => {
  console.log(action);
  switch (action.type) {
    case actions.ADDAVALUE:
      console.log(action.payload);
      return [action.payload,...state];
    case actions.DLTVALUE:
      
      return state.filter((item) => item.BOOK !== action.payload);
    case actions.EDITVALUE:
      const indexValue = state.findIndex((x)=>x.id === action.payload.id)
      state.splice(indexValue,1,action.payload)
      return [...state] ;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  counter: AddReducer,
});
console.log(intialData, "reducer");
