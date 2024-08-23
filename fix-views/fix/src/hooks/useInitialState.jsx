import useClients from './useBlackBox.jsx'

const useInitState=()=>{
  const  {clientsResponse }= useBooks()
const carState = JSON.parse(window.localStorage.getItem('car')) || []
const purchasedState = JSON.parse(window.localStorage.getItem('purchased')) || []
const homeState = JSON.parse(window.localStorage.getItem('home')) || booksHome
const pagesInitState={car:[...carState],purchased:[...purchasedState],home:[...homeState]};
return {pagesInitState}
}
export default useInitState