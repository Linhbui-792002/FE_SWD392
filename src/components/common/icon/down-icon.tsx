import React from 'react';

interface Props {
    size?: number;
    fill?: string;
    width?: number;
    height?: number;
    strokeWidth?: number;
}

const DownIcon: React.FC<Props> = ({
    size,
    width,
    height,
    fill,
    strokeWidth,
}) => (
    <svg
        height={size || height || 24}
        stroke={fill}
        viewBox="0 0 24 24"
        width={size || width || 24}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.08 5.88a.6.6 0 1 0-1.2 0v10.552l-1.375-1.376a.6.6 0 1 0-.85.85l2.4 2.398.009.008a.596.596 0 0 0 .84-.007l2.4-2.4a.6.6 0 0 0-.849-.85L7.08 16.433V5.88Zm4.2 1.2a.6.6 0 0 1 .6-.6h8.4a.6.6 0 0 1 0 1.2h-8.4a.6.6 0 0 1-.6-.6Zm.6 3a.6.6 0 1 0 0 1.2h6a.6.6 0 1 0 0-1.2h-6Zm0 3.6a.6.6 0 1 0 0 1.2h3.6a.6.6 0 1 0 0-1.2h-3.6Zm0 3.6a.6.6 0 1 0 0 1.2h1.2a.6.6 0 1 0 0-1.2h-1.2Z"
            stroke={fill}
            strokeWidth={strokeWidth}
        />
    </svg>
);

export default DownIcon;
