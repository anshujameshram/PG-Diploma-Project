import axios from "axios";

// const url = "http://192.168.0.105:8080";
// const url = "http://192.168.0.105:8080";
const url = "http://127.0.0.1:9090";
// const url = "https://fabricbazar-api-spring-boot.onrender.com";

export async function getProductById(id) {
  try {
    const response = await axios.get(`${url}/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getProductsList() {
  try {
    const response = await axios.get(`${url}/products`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getNewProducts() {
  try {
    const response = await axios.get(`${url}/product/new`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getCategories() {
  try {
    const response = await axios.get(`${url}/category`);
    const formattedData = {};

    response.data.forEach((entry) => {
      const { category, subctegory } = entry;
      if (!formattedData[category]) {
        formattedData[category] = [subctegory];
      } else {
        formattedData[category].push(subctegory);
      }
    });
    return formattedData;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function verifyUser(email, password) {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const response = await axios.post(`${url}/login`, formData,{headers: {'Content-Type': 'multipart/form-data',}});
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export function sentOtpEmail(params) {
  
}

export async function isValidUser(id,token) {
  try {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("token", token);
    const response = await axios.post(`${url}/isvalid`, formData,{headers: {'Content-Type': 'multipart/form-data',}});
    return response.status;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getAllUsers() {
  try {
    const response = await axios.get(`${url}/user`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function createNewUser(name,email,password,type) {
  const userData = {
    "id": 0,
    "name": name,
    "email": email,
    "password": password,
    "type": type,
    "token": null,
    "stamp": null
  }
  try {

    await axios.post(`${url}/user`, userData);
    return true;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function updateUser(user) {
  try{
  await axios.put(`${url}/user`, user);
    // return response.data;
  } catch (error) { 
    console.error("Error:", error);
  }
}

export async function deleteUser(id) {
  try {
  await axios.delete(`${url}/user/${id}`);
    // return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function addNewProduct(productData) {
  const formData = new FormData();
  formData.append('id', 0);

    for (const key in productData) {
      if (Object.hasOwnProperty.call(productData, key)) {
        const element = productData[key];
        formData.append(key, element);
      }
    }

    try {
      const response = await axios.post(`${url}/product`, formData,{headers: {'Content-Type': 'multipart/form-data',}}); // Replace with your API endpoint
      return response.data
    } catch (error) {
      console.error('Error adding product:', error);
    }
}

export async function deleteProduct(id) {
  try {
 await axios.delete(`${url}/product/${id}`);
    // return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}


export async function updateProduct(productData) {
  const formData = new FormData();

    for (const key in productData) {
      if (Object.hasOwnProperty.call(productData, key)) {
        const element = productData[key];
        formData.append(key, element);
      }
    }

    try {
      const response = await axios.put(`${url}/product`, formData,{headers: {'Content-Type': 'multipart/form-data',}}); // Replace with your API endpoint
      return response.data
    } catch (error) {
      console.error('Error adding product:', error);
    }
}