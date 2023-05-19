import { User } from "@prisma/client";
import { Product } from "src/products/entities/product.entity";

export class Review {
    id: number;
    reviewer: User;
    ratedProduct: Product;
    rating: number;
    comments: string;
}
