import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  dir?: 'rtl' | 'ltr';
}

const Card = ({
  children,
  className = '',
  title,
  subtitle,
  footer,
  dir = 'rtl'
}: CardProps) => {
  return (
    <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200" dir={dir}>
          {title && (
            <h3 className="text-lg font-medium text-gray-900">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className="px-6 py-4" dir={dir}>
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200" dir={dir}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
