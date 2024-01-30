import { FoodProps, PromotionConfig } from "@/types";
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
} from "@/components/UI/Card";
import styles from "@/styles/card.module.scss";
import { BsFillGiftFill } from "react-icons/bs";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import NoMatch from "./NoMatch";

const getPromotionConfig = (promotion: string): PromotionConfig => {
  const promotions: Record<string, PromotionConfig> = {
    gift: { icon: <BsFillGiftFill />, content: "gift", cssClass: "gift" },
    "1+1": { icon: null, content: "1+1", cssClass: "onePlusOne" },
    discount: { icon: null, content: "%", cssClass: "discount" },
    default: { icon: null, content: "", cssClass: "" },
  };

  return promotions[promotion] || promotions.default;
};

const Foods = ({ foods, category, search }: FoodProps) => {
  return (
    <>
      {foods && foods.length > 0 ? (
        foods.map((food, index) => {
          const {
            id,
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
          // some items have similar id's so I combined id and index
          const key = id + index;

          return (
            <Card key={key}>
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
        <NoMatch category={category} search={search} />
      )}
    </>
  );
};

export default Foods;
