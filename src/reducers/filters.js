const filterStateDefaults = {
  text : '',
};

export const filtersReducer = (state = filterStateDefaults, action) => {
  switch(action.type) {
    case 'SET_FILTERS':
      return {text: action.text};
    default:
      // console.log("From Filter Reducer", state);
      return state;
  } 
}