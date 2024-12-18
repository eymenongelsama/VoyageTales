// src/components/common/ErrorDisplay.tsx
import React from 'react';

interface ErrorDisplayProps {
    message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
    return (
        <div className="error-display">
            <p>{message}</p>
        </div>
    );
};