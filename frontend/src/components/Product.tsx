import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ProductProps {
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const truncatedDescription =
    product.description.length > 90
      ? `${product.description.substring(0, 90)}...`
      : product.description;
  const truncatedTitle =
    product.title.length > 50
      ? `${product.description.substring(0, 50)}...`
      : product.title;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <Card className="w-full mx-auto   border border-gray-200 ">
      <CardHeader className="p-4"></CardHeader>
      <CardContent className="px-4 py-2 ">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-48 w-full"
        />
        <h2 className="text-lg  h-20 font-semibold hover:underline">
          {truncatedTitle}
        </h2>

        <p className="text-sm  h-20 text-muted-foreground mb-1">
          {truncatedDescription}
        </p>
        <div className="flex items-center space-x-1">
          {renderStars(Math.round(product.rating.rate))}
        </div>
        <div className="mt-4 flex items-end h-full">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Product;
