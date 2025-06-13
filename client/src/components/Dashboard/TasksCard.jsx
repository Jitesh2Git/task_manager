import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/Card";
import {
  IconEyeFilled,
  IconListDetails,
  IconPencilMinus,
  IconTrashFilled,
} from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/Skeleton";
import moment from "moment";
import DeleteTaskModal from "./DeleteTaskModal";
import CreateTaskModal from "./CreateTaskModal";
import EditTaskModal from "./EditTaskModal";
import ViewTaskDetails from "./ViewTaskDetails";
import { Button } from "@/components/ui/Button";

const TasksCard = ({ fetchingTasks, tasks, originalTasks, userId }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  if (fetchingTasks) {
    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 md:px-8 pb-4 md:pb-8">
        {Array.from({ length: 16 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-[160px] w-full rounded-xl bg-custom-border"
          />
        ))}
      </div>
    );
  }

  if (originalTasks?.length === 0) {
    return (
      <div
        className="col-span-full flex flex-col items-center justify-center min-h-[60vh] 
        text-center text-custom-copy-light space-y-3 px-4"
      >
        <div className="flex justify-center">
          <IconListDetails className="w-12 h-12 text-custom-primary-dark" />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium">No tasks yet</p>
          <p className="text-sm">
            You haven’t created any tasks yet. Start by adding your first one.
          </p>
        </div>
        <CreateTaskModal userId={userId} />
      </div>
    );
  }

  if (tasks?.length === 0) {
    return (
      <div
        className="col-span-full flex flex-col items-center justify-center min-h-[50vh] 
      text-center text-custom-copy-light space-y-3 px-4"
      >
        <div className="flex justify-center">
          <IconListDetails className="w-12 h-12 text-custom-primary-dark" />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium">No matching tasks</p>
          <p className="text-sm">
            Try adjusting your search to find a matching task.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tasks.map((task) => (
          <Card
            key={task._id}
            className="bg-background relative h-[180px] flex flex-col justify-between"
          >
            <span
              className={`absolute top-0 right-0 text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase ${
                task.status === "completed"
                  ? "bg-custom-success text-custom-success-content"
                  : "bg-custom-secondary-light text-custom-secondary-content"
              }`}
            >
              {task.status}
            </span>

            <CardHeader className="pb-0 mt-1">
              <CardTitle className="truncate max-w-[200px] text-base">
                {task.title}
              </CardTitle>
              <CardDescription className="line-clamp-1 text-sm text-custom-copy-light">
                {task.description}
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex gap-6 justify-between items-center px-6 pt-0 mt-auto">
              <p className="text-xs text-muted-foreground">
                Created: <br />
                {moment(task.createdAt).format("MMM D, YYYY · h:mm A")}
              </p>
              <div className="flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-custom-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTask(task);
                  }}
                >
                  <IconEyeFilled size={18} className="stroke-current" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-custom-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTaskToEdit(task);
                  }}
                >
                  <IconPencilMinus
                    size={18}
                    className="stroke-current fill-current"
                  />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTaskToDelete(task);
                  }}
                >
                  <IconTrashFilled size={18} className="stroke-current" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedTask && (
        <ViewTaskDetails
          task={selectedTask}
          onCancel={() => setSelectedTask(null)}
        />
      )}

      {taskToDelete && (
        <DeleteTaskModal
          task={taskToDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}

      {taskToEdit && (
        <EditTaskModal task={taskToEdit} onCancel={() => setTaskToEdit(null)} />
      )}
    </div>
  );
};

export default TasksCard;
