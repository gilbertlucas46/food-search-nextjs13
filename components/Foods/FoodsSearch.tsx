"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import useCreateQueryString from "@/components/Hooks/useCreateQueryString";

const FoodsSearch = ({ search }: { search?: string }) => {
  const router = useRouter();
  const initialRender = useRef(true);
  const createQueryString = useCreateQueryString();

  // Set an initial value for the text state
  const [text, setText] = useState(search || "");
  const [query] = useDebounce(text, 750);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push(`/`);
    } else {
      router.push(`/?${createQueryString("search", query)}`);
    }
  }, [query]);

  return (
    <div>
      <input
        value={text}
        placeholder="Enter restaurant name..."
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default FoodsSearch;
