import { api } from 'src/boot/axios';
import UseApi from './useAPI';

class itemAPi extends UseApi {
  async getByOrder(orderId: string) {
    try {
      const res = await api.get(`item/order/${orderId}`)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default itemAPi
