
import React from "react";

export type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "success" 
  | "danger" 
  | "warning" 
  | "info" 
  | "light" 
  | "dark" 
  | "link" 
  | "outline-primary" 
  | "outline-secondary";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  className?: string;
}

// Function to get button class name based on variant and size
export const buttonVariants = (
  { variant = "primary", size }: { variant?: ButtonVariant; size?: ButtonSize } = {}
): string => {
  const baseClass = variant.startsWith("outline-") 
    ? `btn btn-${variant}` 
    : `btn btn-${variant}`;
  
  const sizeClass = size ? `btn-${size}` : "";
  return `${baseClass} ${sizeClass}`.trim();
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size, asChild = false, children, ...props }, ref) => {
    const buttonClass = buttonVariants({ variant, size });
    const combinedClassName = `${buttonClass} ${className || ""}`.trim();
    
    if (asChild) {
      return (
        <button ref={ref} className={combinedClassName} {...props}>
          {children}
        </button>
      );
    }
    
    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
