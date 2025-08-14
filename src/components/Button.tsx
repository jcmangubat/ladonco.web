import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "light" | "dark" | "outline";
  size?: "small" | "medium" | "large";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "dark",
  size = "medium",
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const baseClasses = "btn-slide hover-slide-right text-uppercase";
  const variantClasses = {
    light: "btn-light",
    dark: "btn-dark",
  };
  const sizeClasses = {
    small: "btn-small",
    medium: "btn-medium",
    large: "btn-large",
  };

  const buttonClasses =
    `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  if (href) {
    return (
      <Link to={href} className={buttonClasses}>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${buttonClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
