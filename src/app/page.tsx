"use client";
import { useState, useEffect } from "react";
import DateDisplay from "@/components/date-display";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const calorieGoal = 3000;

interface Meal {
  name: string;
  calories: number;
}

const defaultMeals: Meal[] = [
  {
    name: "Chipotle Chicken Bowl",
    calories: 900,
  },
];

export default function Home() {
  const [totalCalories, setTotalCalories] = useState(0);
  const [meals, setMeals] = useState<Meal[]>(defaultMeals);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const newTotalCalories = meals.reduce(
      (sum, meal) => sum + meal.calories,
      0,
    );
    setTotalCalories(newTotalCalories);
  }, [meals]);

  const handleAddMeal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const mealName = formData.get("meal-name") as string;
    const mealCalories = formData.get("meal-calories") as string;

    if (mealName && mealCalories) {
      const newMeal: Meal = {
        name: mealName,
        calories: parseInt(mealCalories, 10),
      };
      setMeals([...meals, newMeal]);
    }
    setIsOpen(false);
  };

  return (
    <main className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Intentional Eating</h1>
      <DateDisplay />
      <div className="mb-4">
        <Label htmlFor="calories" className="block mb-2">
          Calories
        </Label>
        <Progress
          id="calories"
          value={(totalCalories / calorieGoal) * 100}
          className="w-full"
        />
        <p className="mt-2">
          {totalCalories} / {calorieGoal} calories
        </p>
      </div>
      <div className="space-y-4">
        {meals.map((meal: Meal, index) => (
          <div className="border rounded p-4" key={index}>
            <h2 className="text-lg font-semibold">Meal: {meal.name}</h2>
            <p>Calories: {meal.calories}</p>
          </div>
        ))}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)}>Add Meal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Meal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddMeal} className="space-y-4">
              <div>
                <Label htmlFor="meal-name">Name</Label>
                <Input id="meal-name" name="meal-name" type="text" required />
              </div>
              <div>
                <Label htmlFor="meal-calories">Calories</Label>
                <Input
                  id="meal-calories"
                  name="meal-calories"
                  type="number"
                  required
                />
              </div>
              <Button type="submit">Add</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
