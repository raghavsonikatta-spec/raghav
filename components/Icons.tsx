
import React from 'react';

type IconProps = {
  className?: string;
};

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

export const MagicWandIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25278V6.25278C12 6.25278 12 6.25278 12 6.25278C10.6667 6.25278 9.33333 5.58611 8 4.25278C6.66667 2.91944 6 1.58611 6 0.252778V0.252778M12 6.25278L13.5 9.25278L16.5 10.7528L13.5 12.2528L12 15.2528L10.5 12.2528L7.5 10.7528L10.5 9.25278L12 6.25278Z" transform="translate(4 4)" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21L12 12" />
  </svg>
);

export const ImageIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const LoadingSpinner: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`animate-spin ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v3m0 12v3m9-9h-3m-12 0H3m16.5-6.5l-2.12 2.12M7.62 16.38l-2.12 2.12M16.38 7.62l2.12-2.12M5.5 18.5l2.12-2.12"
    />
  </svg>
);
