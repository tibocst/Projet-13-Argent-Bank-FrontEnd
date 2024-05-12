// import { data } from "../datas/data.js";

export const getUser = async () => {
  try {
    // const response = await fetch(data)
    const response = await fetch("https://projet-13-argent-bank-backend.onrender.com/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: "tony@stark.com",
        password: "password123",
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
    const data = await response.json();

    return data.data || data;
  } catch (error) {
    return null;
  }
};
