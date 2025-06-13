import { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { IconLoader2, IconX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../ui/Toaster";
import { toggleTaskStatus, updateTask } from "../../store/slices/taskSlice";
import { validateEditTaskForm } from "../../lib/validations";

const EditTaskModal = ({ task, onCancel }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "");
  const { changingStatus, updatingTask } = useSelector((state) => state.tasks);

  const isUnchanged = useMemo(() => {
    return (
      title.trim() === task.title && description.trim() === task.description
    );
  }, [title, description, task.title, task.description]);

  const handleToggleStatus = async () => {
    const resultAction = await dispatch(toggleTaskStatus(task._id));

    if (toggleTaskStatus.fulfilled.match(resultAction)) {
      showToast({
        type: "success",
        message: `Task marked as ${
          resultAction.payload.status === "completed"
            ? "Completed!"
            : "Pending!"
        }`,
      });
      setStatus(resultAction.payload.status);
    } else {
      showToast({
        type: "error",
        message: resultAction.payload || "Failed to toggle task status",
      });
    }
  };

  const handleUpdate = async () => {
    const errorMessage = validateEditTaskForm({ title, description });
    if (errorMessage) {
      showToast({ type: "error", message: errorMessage });
      return;
    }

    const resultAction = await dispatch(
      updateTask({ id: task._id, updates: { title, description } })
    );

    if (updateTask.fulfilled.match(resultAction)) {
      showToast({ type: "success", message: "Task updated successfully!" });
    } else {
      showToast({
        type: "error",
        message: resultAction.payload || "Failed to update task",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 animate-in fade-in-0 duration-200" />

      <div
        className="bg-background fixed z-50 grid w-full max-w-[calc(100%-2rem)] sm:max-w-lg translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] border p-6 shadow-lg rounded-lg animate-in fade-in-0 zoom-in-95 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          disabled={updatingTask || changingStatus}
          className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <IconX className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col gap-2 text-left mb-4">
          <h2 className="text-lg font-semibold leading-none">Edit Task</h2>
          <p className="text-sm text-muted-foreground">
            Update the details of your task.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Input
              value={title}
              placeholder="Task Title"
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={100}
              className="text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {title.length}/100
            </p>
          </div>

          <div>
            <Textarea
              value={description}
              placeholder="Task Description"
              onChange={(e) => setDescription(e.target.value.slice(0, 500))}
              required
              className="text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {description.length}/500
            </p>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-3">
            <p className="text-sm font-medium">
              Status:{" "}
              <span
                className={`px-2 py-1 text-xs font-medium uppercase rounded-bl-lg rounded-tr-lg ${
                  status === "completed"
                    ? "bg-custom-success text-custom-success-content"
                    : "bg-custom-secondary-light text-custom-secondary-content"
                }`}
              >
                {status}
              </span>
            </p>
            <Button
              variant="outline"
              size="sm"
              className="text-sm"
              disabled={updatingTask}
              onClick={handleToggleStatus}
            >
              Mark as {status === "completed" ? "pending" : "completed"}
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            disabled={updatingTask || changingStatus}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="custom"
            className="bg-custom-secondary"
            disabled={
              !title.trim() ||
              !description.trim() ||
              updatingTask ||
              changingStatus ||
              isUnchanged
            }
            onClick={handleUpdate}
          >
            {updatingTask ? (
              <>
                <IconLoader2 className="h-4 w-4 animate-spin" />
                Updating
              </>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
