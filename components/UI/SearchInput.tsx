import * as React from "react";
import styles from "@/styles/searchInput.module.scss";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
}

const SearchInputWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} {...props} className={styles["search__wrapper"]} />
));
SearchInputWrapper.displayName = "SearchInputWrapper";

// Use the SearchInputProps in the generic type
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      className={styles["search__input"]}
      autoComplete="off"
    />
  )
);
SearchInput.displayName = "SearchInput";

export { SearchInputWrapper, SearchInput };
