// components/Foods/FoodCategoryFilter.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const FoodCategoryFilter = ({
  categoryId,
}: {
  categoryId?: string;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialRender = useRef(true);

  // Set an initial value for the text state
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categoryId || ""
  );

  const [category] = useDebounce(selectedCategoryId, 750);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const url = `${pathname}?${searchParams}`;

    if (!category) {
      router.push(url);
    } else {
      router.push(`/?${createQueryString("categoryId", selectedCategoryId)}`);
    }
  }, [searchParams, selectedCategoryId]);

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
  };

  const categories = [
    {
      id: "6288a89f1f0152b8c2cd512b",
      name: "Shushi",
    },
    {
      id: "6288a89f7338764f2071a8a8",
      name: "Pizza",
    },
    {
      id: "6288a89f70dc8cf93b71609b",
      name: "Hot Meals",
    },
    {
      id: "6288a89fe6c2fe0b758360fe",
      name: "Deserts",
    },
    {
      id: "6288a89fac9e970731bfaa7b",
      name: "Drinks",
    },
  ];

  return (
    <div>
      <p>Filter by Category:</p>
      <div className="categorybuttons">
        {categories.map((item) => (
          <button key={item.id} onClick={() => handleCategoryClick(item.id)}>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FoodCategoryFilter;
