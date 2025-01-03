import axios from "axios";
const putApi = async (id,data) => {
  try {
    const response = await axios.put(`http://localhost:5200/items/${id}`, data);
    return response.data
  } catch (error) {
    console.error(error);
  }
}
export default putApi;