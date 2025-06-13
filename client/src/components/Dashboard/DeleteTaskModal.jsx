import { Button } from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../store/slices/taskSlice";
import { showToast } from "@/components/ui/Toaster";
import { IconLoader2 } from "@tabler/icons-react";

const DeleteTaskModal = ({ task, onCancel }) => {
  const dispatch = useDispatch();
  const deletingTask = useSelector((state) => state.tasks.deletingTask);

  const handleDelete = async () => {
    const resultAction = await dispatch(deleteTask(task._id));

    if (deleteTask.fulfilled.match(resultAction)) {
      showToast({
        type: "success",
        message: "Task deleted successfully!",
      });
      onCancel();
    } else {
      showToast({
        type: "error",
        message: resultAction.payload || "Failed to delete task",
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
        <div className="flex flex-col gap-2 text-left mb-4">
          <h2 className="text-lg font-semibold leading-none">Delete Task</h2>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>
        </div>

        <div className="flex flex-row justify-end gap-2 mt-6">
          <Button variant="outline" disabled={deletingTask} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="custom"
            disabled={deletingTask}
            className="bg-custom-secondary text-white"
            onClick={handleDelete}
          >
            {deletingTask ? (
              <>
                <IconLoader2 className="h-4 w-4 animate-spin" />
                Deleting
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
