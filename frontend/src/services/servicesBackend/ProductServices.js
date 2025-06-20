import API from '../apiAxios'
import { getToken, getUserData } from '../storageService'

class ProductServices {
  static async createProduct(data) {
    try {
      const token = await getToken()
      const response = await API.post('/product', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Erro ao criar Produto', error)
      throw error
    }
  }

  static async updateProduct(id, data) {
    try {
      const token = await getToken()
      const response = await API.put(`/product/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar Produto', error)
      throw error
    }
  }

  static async deleteProduct(id) {
    try {
      const token = await getToken()
      const response = await API.delete(`/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { status: false }
      })
      return response.data
    } catch (error) {
      console.error('Erro ao deletar Produto', error)
      throw error
    }
  }

  static async getProductsByShelfId(shelfId) {
    try {
      const token = await getToken()

      const response = await API.get(`/product/shelf/${shelfId}?status=true`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produtos por shelfId', error)
      throw error
    }
  }

  static async getHistory(status) {
    try {
      const token = await getToken()
      const user = await getUserData()
      const idCompany = user.companyId

      const response = await API.get(`/product/company/${idCompany}?status=${status}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produtos por companyId', error)
      throw error
    }
  }

  static async getProductById(productId) {
    try {
      const token = await getToken()
      const response = await API.get(`/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produto por ID', error)
      throw error
    }
  }

  static async searchProducts(companyId, searchText) {
    try {
      const token = await getToken();
      const response = await API.get(`/search/${companyId}?search=${encodeURIComponent(searchText)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos por texto', error);
      throw error;
    }
  }
}

export default ProductServices