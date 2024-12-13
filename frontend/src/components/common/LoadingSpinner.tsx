// src/components/common/LoadingSpinner.tsx
import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-spinner">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="31.415, 31.415"
                    strokeDashoffset="0"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="1s"
                        keyTimes="0;1"
                        values="0 12 12;360 12 12"
                    />
                </circle>
            </svg>
        </div>
    );
};