/* import responseApi from '../data.json'

const data=responseApi

 */
import responseApi from "../data.json";
const boxBlack = responseApi.users.map(({ user }) => user)
function useClient() {
  const clientsResponse = boxBlack?.map((user) => ({
   id: user.id,

  }));
  return { useClient };
}
export default useClient;