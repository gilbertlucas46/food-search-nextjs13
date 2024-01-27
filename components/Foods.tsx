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

export interface FoodProps {
  foods: Food[] | null;
}

const Foods = ({ foods }: FoodProps) => {
  return (
    <div className={styles["cards__wrapper"]}>
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
          const promotionClass = () => {
            switch (promotion) {
              case "gift":
                return promotion;
              case "1+1":
                return "onePlusOne";
              case "discount":
                return "%";
              default:
                return "";
            }
          };
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
                    className={styles[`card__promotion--${promotionClass()}`]}
                  >
                    {promotion === "gift" ? <BsFillGiftFill /> : promotion}
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
        <div>no food</div>
      )}
    </div>
  );
};

export default Foods;
