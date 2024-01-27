export interface Product {
    title: string;
    price: number;
    thumbnail: string;
}


export interface fetchProducts {
    products: productItems[];

}

interface productItems {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}