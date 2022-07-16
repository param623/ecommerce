export class Product {
    brand!: string;
    category!: string;
    description!: string;
    discountPercentage!: number;
    id!: number;
    images: Array<string> = [];
    price!: number;
    rating!: number;
    stock!: number;
    selectedQuantity!: number;
    thumbnail!: string;
    title!: string;
}