export default (state = { product: 'Diesel' }, action) => {
  switch (action.type) {
    case 'PUMP1_SELECTED_PRODUCT':
      return action.payload
    default:
      return state
  }
}
