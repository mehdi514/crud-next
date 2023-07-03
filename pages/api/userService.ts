import axios from "axios";
import { User } from "../../types/User";

const API_URL = "http://192.168.18.7:5163";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_URL}/User`);
    console.log({ response });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async (userData: {
  username: string;
  firstName: string;
  lastName: string;
}): Promise<void> => {
  try {
    await axios.post(`${API_URL}/User`, userData);
    console.log("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/User/${id}?userId=${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const updateUser = async (
  updatedData: Partial<User>
): Promise<User> => {
  try {
    const response = await axios.put(`${API_URL}/User`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
