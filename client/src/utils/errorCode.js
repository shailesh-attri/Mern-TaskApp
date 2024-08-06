export const handleErrorCode = (error) =>{
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response from server:', error.response.status);
        
        // Handle different status codes as needed
        if (error.response.status === 404) {
          console.error('User not found');
          
        } else if (error.response.status === 401) {
          console.error('Invalid password');
          
        } else {
          console.error('Unexpected error:', error.response.data);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
}