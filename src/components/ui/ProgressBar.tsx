import React from 'react';

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep,
  className = '',
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div className={`
                flex h-8 w-8 items-center justify-center rounded-full 
                ${index < currentStep ? 'bg-blue-600' : index === currentStep ? 'bg-blue-500 ring-4 ring-blue-100' : 'bg-gray-200'}
                transition-colors duration-200
              `}>
                <span className={`text-sm font-medium ${index <= currentStep ? 'text-white' : 'text-gray-500'}`}>
                  {index + 1}
                </span>
              </div>
              <span className="mt-2 text-xs font-medium text-gray-600">{step}</span>
              {index < steps.length - 1 && (
                <div className="absolute left-0 right-0 top-4 -z-10">
                  <div 
                    className={`h-0.5 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`}
                    style={{ width: `${100 / (steps.length - 1)}%`, marginLeft: `${(100 / (steps.length - 1)) * index + (50 / (steps.length - 1))}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="sm:hidden">
        <p className="text-sm font-medium mb-1">
          Step {currentStep + 1} of {steps.length}
        </p>
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;