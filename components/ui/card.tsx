import * as React from "react";
import styles from "@/styles/card.module.scss";
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} {...props} className={styles["card__item"]} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={styles["cardHeader"]} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={styles["cardTitle"]} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={styles["card__content"]} {...props} />
));
CardContent.displayName = "CardContent";

const CardContentImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={styles["card__image"]} {...props} />
));
CardContentImage.displayName = "CardContentImage";

const CardContentLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`${styles["card__label"]} ${className}`}
    {...props}
  />
));
CardContentLabel.displayName = "CardContentLabel";

const CardContentLabelList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`${styles["card__labels"]} ${className}`}
    {...props}
  />
));
CardContentLabelList.displayName = "CardContentLabelList";

const CardContentPromotion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`${styles["card__promotion"]} ${className}`}
    {...props}
  />
));
CardContentPromotion.displayName = "CardContentPromotion";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={styles["card__footer"]} {...props} />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
  CardContentImage,
  CardContentPromotion,
  CardContentLabel,
  CardContentLabelList,
};
