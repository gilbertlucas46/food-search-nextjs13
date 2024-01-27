import { Food } from "@/types";
import React from "react";
import {
  Card,
  CardContent,
  CardContentImage,
  CardFooter,
  CardTitle,
} from "@/components/ui/Card";
import styles from "@/styles/card.module.scss";

export interface FoodProps {
  foods: Food[] | null;
}

const Foods = ({ foods }: FoodProps) => {
  return (
    <div className={styles["cards__wrapper"]}>
      {foods ? (
        foods.map((food) => (
          <Card key={food.id}>
            <CardContent>
              <CardContentImage>
                <img
                  src={food.imageUrl.replace("400x400", "294x178")}
                  alt={food.name}
                />
              </CardContentImage>
            </CardContent>
            <CardFooter>
              <CardTitle className="my-2">{food.name}</CardTitle>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div>no food</div>
      )}
    </div>
  );
};

export default Foods;
