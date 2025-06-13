import { IconListCheck, IconClock, IconTrash } from "@tabler/icons-react";

const HowItWorks = () => {
  return (
    <div className="pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="py-1 px-4 bg-custom-secondary rounded-full text-xs font-medium text-custom-secondary-content">
            How It Works
          </span>
          <h2 className="text-4xl font-bold text-gray-900 py-5">
            Manage Your Tasks in 3 Simple Steps
          </h2>
          <p className="text-lg font-normal text-gray-500 max-w-2xl mx-auto">
            Stay organized and focused with a minimal, no-fuss task manager.
            Add, complete, and manage your daily tasks with ease.
          </p>
        </div>

        <div className="flex justify-center items-center gap-x-5 gap-y-8 flex-wrap lg:flex-nowrap lg:justify-between">
          <div className="text-center group w-full max-w-xs mx-auto">
            <div className="bg-indigo-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto transition-all duration-500 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600">
              <IconListCheck size={36} />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Create Tasks
            </h4>
            <p className="text-sm text-gray-500">
              Quickly add tasks with title and description to keep your work
              structured.
            </p>
          </div>

          <div className="text-center group w-full max-w-xs mx-auto">
            <div className="bg-pink-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto transition-all duration-500 group-hover:bg-pink-600 group-hover:text-white text-pink-600">
              <IconClock size={36} />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Track Progress
            </h4>
            <p className="text-sm text-gray-500">
              View your tasks, mark them complete, and stay focused on what
              matters most.
            </p>
          </div>

          <div className="text-center group w-full max-w-xs mx-auto">
            <div className="bg-teal-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto transition-all duration-500 group-hover:bg-teal-600 group-hover:text-white text-teal-600">
              <IconTrash size={36} />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Clear & Repeat
            </h4>
            <p className="text-sm text-gray-500">
              Remove completed tasks and repeat the cycle to stay productive
              every day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
