import { Food } from "@/types";
import React from "react";
import {
  Card,
  CardContent,
  CardContentImage,
  CardContentLabel,
  CardContentLabelList,
  CardContentPromotion,
  CardFooter,
  CardTitle,
} from "@/components/ui/Card";
import styles from "@/styles/card.module.scss";
import { BsFillGiftFill } from "react-icons/bs";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Spinner from "./ui/Spinner";

interface PromotionConfig {
  icon: React.ReactNode | null;
  content: string;
  cssClass: string;
}
export interface FoodProps {
  foods: Food[] | null;
}

const getPromotionConfig = (promotion: string): PromotionConfig => {
  const promotions: Record<string, PromotionConfig> = {
    gift: { icon: <BsFillGiftFill />, content: "gift", cssClass: "gift" },
    "1+1": { icon: null, content: "1+1", cssClass: "onePlusOne" },
    discount: { icon: null, content: "%", cssClass: "discount" },
    default: { icon: null, content: "", cssClass: "" },
  };

  return promotions[promotion] || promotions.default;
};

const Foods = ({ foods }: FoodProps) => {
  return (
    <>
      {foods ? (
        foods.map((food) => {
          const {
            rating,
            minCookTime,
            maxCookTime,
            imageUrl,
            name,
            promotion,
            isNew,
          } = food;
          const cookTime = `${minCookTime}-${maxCookTime}`;
          const newRating = rating.toFixed(1);
          const { icon, content, cssClass } = getPromotionConfig(promotion);

          return (
            <Card key={food.id}>
              <CardContent>
                <CardContentImage>
                  <Image
                    src={imageUrl.replace("400x400", "294x178")}
                    alt={name}
                    width={294}
                    height={178}
                  />
                </CardContentImage>
                {promotion !== null && (
                  <CardContentPromotion
                    className={styles[`card__promotion--${cssClass}`]}
                  >
                    {icon ?? content}
                  </CardContentPromotion>
                )}
              </CardContent>
              <CardFooter>
                <CardTitle>{name}</CardTitle>
                <CardContentLabelList>
                  <CardContentLabel>
                    <FaStar />
                    {newRating}
                  </CardContentLabel>
                  <CardContentLabel>{cookTime}</CardContentLabel>
                  {isNew === true && (
                    <CardContentLabel className={styles["new"]}>
                      New
                    </CardContentLabel>
                  )}
                </CardContentLabelList>
              </CardFooter>
            </Card>
          );
        })
      ) : (
        <div>Nothing to display</div>
      )}
    </>
  );
};

export default Foods;
