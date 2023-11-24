import axios from "axios";

const API_URL = "http://localhost:5000/api/goals/";

const createGoal = async (goalData: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);
  return response.data;
};

//Get user goals
const getGoals = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

//Delete goal
const deleteGoal = async (goalId: any, token: any) => {
  // Configuration for the HTTP request, including the Authorization header with the token.
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Making a DELETE request to delete a goal using Axios.
  const response = await axios.delete(API_URL + goalId, config);
  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
