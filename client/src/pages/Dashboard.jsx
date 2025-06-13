import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth } from "../store/slices/authSlice";
import { fetchTasks } from "../store/slices/taskSlice";
import { showToast } from "@/components/ui/Toaster";
import Loading from "@/components/Loading";
import CreateTaskModal from "../components/Dashboard/CreateTaskModal";
import TasksCard from "../components/Dashboard/TasksCard";
import UserAvatar from "../components/Dashboard/UserAvatar";
import Search from "../components/Dashboard/Search";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { loading, user, error } = useSelector((state) => state.auth);
  const { fetchingTasks, tasks } = useSelector((state) => state.tasks);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch, refresh]);

  useEffect(() => {
    dispatch(fetchTasks()).finally(() => {
      setIsInitialLoad(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (error && !hasShownToast.current) {
      showToast({
        type: "error",
        message: "Please log in to access the dashboard!",
      });
      hasShownToast.current = true;
      navigate("/sign-in");
    }
  }, [error, navigate]);

  const filteredTasks =
    tasks?.filter((task) => {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }) || [];

  if (loading) return <Loading />;

  return (
    <section className="w-full space-y-8">
      <div className="sticky top-0 z-50 bg-custom-foreground flex justify-between items-center gap-4 py-4 border-b px-4 md:px-8">
        <Link to="/">
          <img src="/logo.png" alt="Logo Image" className="w-auto h-8" />
        </Link>
        <UserAvatar user={user} refresh={() => setRefresh(!refresh)} />
      </div>

      <div className="space-y-4 px-4 md:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-3xl font-semibold text-custom-copy">
            My Tasks
          </h2>

          {tasks?.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="max-md:hidden">
                <Search value={searchQuery} onChange={setSearchQuery} />
              </div>

              <CreateTaskModal userId={user?._id} />
            </div>
          )}
        </div>

        {tasks?.length > 0 && (
          <div className="md:hidden">
            <Search value={searchQuery} onChange={setSearchQuery} />
          </div>
        )}
      </div>

      <TasksCard
        fetchingTasks={fetchingTasks || isInitialLoad}
        tasks={filteredTasks}
        originalTasks={tasks}
        userId={user?._id}
      />
    </section>
  );
};

export default Dashboard;
