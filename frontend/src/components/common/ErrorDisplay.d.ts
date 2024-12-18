// src/components/common/ErrorDisplay.d.ts
declare module 'components/common/ErrorDisplay' {
    import { FC } from 'react';

    interface ErrorDisplayProps {
        message: string;
    }

    export const ErrorDisplay: FC<ErrorDisplayProps>;
}