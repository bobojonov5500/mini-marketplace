
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
    }

    // getOneProduct: async()=>{
    //             try {
                    
    //             } catch (error) {
                    
    //             }
    // }

}

export default APIService