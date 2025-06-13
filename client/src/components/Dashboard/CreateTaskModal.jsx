import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { IconCopyPlusFilled, IconLoader2, IconX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../ui/Toaster";
import { createTask } from "../../store/slices/taskSlice";
import { validateCreateTaskForm } from "../../lib/validations";

const CreateTaskModal = ({ userId }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const creatingTask = useSelector((state) => state.tasks.creatingTask);

  const handleClose = () => {
    setIsOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleCreate = async () => {
    const errorMessage = validateCreateTaskForm({ title, description });
    if (errorMessage) {
      showToast({ type: "error", message: errorMessage });
      return;
    }

    const resultAction = await dispatch(
      createTask({ title, description, userId })
    );

    if (createTask.fulfilled.match(resultAction)) {
      showToast({ type: "success", message: "Task created successfully!" });
      setTitle("");
      setDescription("");
    } else {
      showToast({
        type: "error",
        message: resultAction.payload || "Failed to create task",
      });
    }
  };

  return (
    <>
      <Button
        variant="custom"
        onClick={() => setIsOpen(true)}
        className="rounded-none flex items-center gap-2"
      >
        <IconCopyPlusFilled size={16} />
        Create Task
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50 animate-in fade-in-0 duration-200" />

          <div
            className="bg-background fixed z-50 grid w-full max-w-[calc(100%-2rem)] sm:max-w-lg translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] border p-6 shadow-lg rounded-lg animate-in fade-in-0 zoom-in-95
             max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              disabled={creatingTask}
              className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <IconX className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </button>

            <div className="flex flex-col gap-2 text-left mb-4">
              <h2 className="text-lg font-semibold leading-none">
                Create New Task
              </h2>
              <p className="text-sm text-muted-foreground">
                Fill in the details to create a task.
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
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  maxLength={500}
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {description.length}/500
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-end gap-2 mt-6">
              <Button
                variant="outline"
                disabled={creatingTask}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="custom"
                className="bg-custom-secondary"
                disabled={!title || !description || creatingTask}
                onClick={handleCreate}
              >
                {creatingTask ? (
                  <>
                    <IconLoader2 className="h-4 w-4 animate-spin" />
                    Creating
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTaskModal;
