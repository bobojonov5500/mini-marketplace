
const API_URL = 'https://fakestoreapi.com/products'


const APIService = {

    getAllProducts: async () => {
        try {
            const response = await fetch(API_URL)
            if (response.status !== 200) {
                console.log('!!!error occured')
            }
            const result = await response.json()
            return result

        } catch (error) {
            console.log(error)
        }
    },

    getOneProduct: async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/${id}`)
            if (response.status !== 200) {
                console.log('error')
            }
            const result = await response.json()
            return result
        } catch (error) {
            console.log(error)
        }
    }

}

export default APIService