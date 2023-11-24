import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../Components/GoalForm";
import Spinner from "../Components/Spinner";
import { getGoals, reset } from "../app/features/goals/goalSlice";
import GoalItem from "../Components/GoalItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const { goals, isLoading, isError, message } = useSelector(
    (state: any) => state.goals
  );
  useEffect(() => {
    if (isError) {
      console.log(isError);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getGoals() as any);
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div>
            {goals.map((goal: any) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You don't have any goals</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
