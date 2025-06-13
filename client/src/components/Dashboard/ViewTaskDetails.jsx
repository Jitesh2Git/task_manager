import { IconX } from "@tabler/icons-react";
import moment from "moment";

const ViewTaskDetails = ({ task, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 animate-in fade-in-0 duration-200 cursor-pointer"
        onClick={onCancel}
      />

      <div
        className="bg-background w-[90%] max-w-lg rounded-xl p-6 shadow-xl relative max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <IconX className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="space-y-4 mt-4 sm:mt-2">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Title
            </p>
            <h2 className="text-sm text-foreground">{task.title}</h2>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Description
            </p>
            <p className="text-sm text-foreground">{task.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-muted-foreground">Created</p>
            <span className="text-sm text-foreground">
              {moment(task.createdAt).format("MMM D, YYYY · h:mm A")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-muted-foreground">Updated</p>
            <span className="text-sm text-foreground">
              {moment(task.updatedAt).format("MMM D, YYYY · h:mm A")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-muted-foreground">Status</p>
            <span
              className={`inline-block px-2 py-1 text-xs font-medium uppercase rounded-bl-lg rounded-tr-lg ${
                task.status === "completed"
                  ? "bg-custom-success text-custom-success-content"
                  : "bg-custom-secondary-light text-custom-secondary-content"
              }`}
            >
              {task.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskDetails;
