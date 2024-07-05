import { api } from 'src/boot/axios';

class UseApi {
  private route: string

  constructor (Route: string) {
    this.route = Route
  }

  async get () {
    const res = await api.get(this.route)
    return res.data
  }

  async getByID (itemId: string) {
    const res = await api.get(`${this.route + '/' + itemId}`)
    return res.data
  }

  async getByName (itemName: string) {
    const res = await api.get(`${this.route + '/name/' + itemName}`)
    return res.data
  }

  async post(form: object) {
    const res = await api.post(this.route, form)
    return res.data

  }

  async put(itemId: string, form: object) {
    const res = await api.put(`${this.route + '/' + itemId}`, form)
    return res.data
  }

  async delete(itemId: string) {
    const res = await api.delete(`${this.route + '/' + itemId}`)
    return res.data
  }

   async uploadImage(file: string) {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.postForm('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}

export default UseApi
