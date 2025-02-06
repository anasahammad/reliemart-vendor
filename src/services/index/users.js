import axios from "axios";


// Make a POST request to the server's registration endpoint
export const signup = async ({ name, email, password , phone,}) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/vendor/registerVendor`, {
      name,
      email,
      password ,
      phone,
      
    });
    return data;  // Return the data received from the server
  } catch (error) {
    // Handle errors during the registration process
    if (error.response && error.response.data.message)

      // If the server responds with an error message, throw that message
      throw new Error(error.response.data.message);

    // If there is no specific error message from the server, throw the general error message
    throw new Error(error.message);
  }
};





// admin login
export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/vendor/loginVendor`,
      {
        email,
        password,
      },
      {
        withCredentials: true, // useCredential true
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};




// reseller details
export const getUserByIdForReseller = async (vendorId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/vendor/${vendorId}`,
      {
        withCredentials: true,
      }

    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};