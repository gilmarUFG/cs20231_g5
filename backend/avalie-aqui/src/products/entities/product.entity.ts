import { Review } from "src/reviews/entities/review.entity";

export class Product {
    id: number;
    name: string;
    category: string;
    averageRating: number;
    review: Review[];
}
