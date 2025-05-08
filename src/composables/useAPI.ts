import { api } from 'src/boot/axios';

class UseApi {
  private route: string

  constructor (Route: string) {
    this.route = Route
  }

  async get () {
    try {
      const res = await api.get(this.route)
      return res.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  async getByID (itemId: string) {
    try {
      const res = await api.get(`${this.route + '/' + itemId}`)
      return res.data
    } catch (error) {
      console.error('Error fetching data by ID:', error)
      throw error
    }
  }

  async getByName (itemName: string) {
    try {
      const res = await api.get(`${this.route + '/name/' + itemName}`)
      return res.data
    } catch (error) {
      console.error('Error fetching data by name:', error)
    }
  }

  async post(form: object) {
    try {
      const res = await api.post(this.route, form)
      return res.data
    } catch (error) {
      console.error('Error posting data:', error)
      throw error
    }
  }

  async put(itemId: string, form: object) {
    try {
      const res = await api.put(`${this.route + '/' + itemId}`, form)
      return res.data
    } catch (error) {
      console.error('Error updating data:', error)
      throw error
    }
  }

  async delete(itemId: string) {
    try {
      const res = await api.delete(`${this.route + '/' + itemId}`)
      return res.data
    } catch (error) {
      console.error('Error deleting data:', error)
      throw error
    }
  }

  async uploadImage(file: string) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await api.postForm('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }
}

export default UseApi
