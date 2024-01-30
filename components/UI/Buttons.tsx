import * as React from "react";
import styles from "@/styles/buttons.module.scss";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`${styles["button"]} ${className ? className : ""}`}
    {...props}
  />
));
Button.displayName = "Button";

export { Button };
