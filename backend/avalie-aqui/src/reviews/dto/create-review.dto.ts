import { User } from "@prisma/client";
import { Product } from "src/products/entities/product.entity";

export class CreateReviewDto {
    reviewerId: number;
    ratedProductId: number;
    rating: number;
    comments: string;
}
