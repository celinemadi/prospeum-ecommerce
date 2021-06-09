export class Product {
    id: string;
    name: string;
    price?:number;
    availability?:number;
    size?:string;
    description: string;
    calories?: number;

    constructor(product?: { _id?: any; name?: any; price?: any; availability?: any; size?: any; dimensions?: any; artist?: any; } | undefined)
    {
        product = product || {};
        this.id = product._id || '',
        this.name = product.name || '',
        this.price = product.price || 0,
        this.availability = product.availability || 0,
        this.size = product.size || '',
        this.description = product.dimensions || '',
        this.calories = product.artist || 0
    }
}