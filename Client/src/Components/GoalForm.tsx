import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { GiRocketFlight } from "react-icons/gi";
import { createGoal } from "../app/features/goals/goalSlice";

const GoalForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ text });
    dispatch(createGoal({ text }) as any);
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Goal..."
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">
            Add Goal <GiRocketFlight style={{ marginLeft: "10px" }} />
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
