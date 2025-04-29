
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | "outline-primary" | "outline-secondary";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size, asChild = false, children, ...props }, ref) => {
    const baseClass = variant.startsWith("outline-") 
      ? `btn btn-${variant}` 
      : `btn btn-${variant}`;
    
    const sizeClass = size ? `btn-${size}` : "";
    const buttonClass = `${baseClass} ${sizeClass} ${className || ""}`.trim();
    
    if (asChild) {
      return (
        <button ref={ref} className={buttonClass} {...props}>
          {children}
        </button>
      );
    }
    
    return (
      <button ref={ref} className={buttonClass} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
