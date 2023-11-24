import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../app/features/goals/goalSlice";

interface Goal {
  createdAt: string;
  text: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

// Create a simplified Goal type with only the necessary properties
type SimplifiedGoal = Pick<Goal, "createdAt" | "text" | "_id">;

const GoalItem: React.FC<{ goal: SimplifiedGoal }> = ({ goal }) => {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button
        onClick={() => dispatch(deleteGoal(goal._id) as any)}
        className="close"
      >
        X
      </button>
    </div>
  );
};

export default GoalItem;
