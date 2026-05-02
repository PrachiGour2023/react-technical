import type { Product } from "./type"

const ProductCard = ({ item } : { item: Product}) => {
    return (
        <div className='product-container'>
            <img src={item?.thumbnail} alt={item.title} className='product-image' />
            <div className=''>
                <p>{item.title}<span className='brand'>{item.category}</span></p>
                <div className='product-info'>
                    <span className='price'>${item.price}</span>
                    <span className='in-stock'>{item.availabilityStatus}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard