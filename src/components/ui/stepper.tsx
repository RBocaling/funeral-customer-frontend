import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  completed: boolean;
  active: boolean;
}

interface StepperProps {
  steps: Step[];
  className?: string;
}

const Stepper = ({ steps, className }: StepperProps) => {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex justify-between mb-2">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center w-1/4">
            <div
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full mb-1",
                step.active
                  ? "bg-primary text-primary-foreground"
                  : step.completed
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              )}
            >
              {step.number}
            </div>
            <span className="text-xs text-center">{step.title}</span>
          </div>
        ))}
      </div>
      <div className="flex mb-6">
        {steps.slice(0, -1).map((_, index) => {
          const isActive = steps[index].completed || steps[index].active;
          return (
            <div
              key={index}
              className={cn("stepper-line flex-1", isActive ? "active" : "")}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
