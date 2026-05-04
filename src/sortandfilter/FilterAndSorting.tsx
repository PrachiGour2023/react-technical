import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './index.css';
import type { Product } from './type';


const FilterAndSorting = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState({
        sortBy: 'title',
        sortOrder: 'asc'
    })

    const fetchData = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products?limit=0');
            const json = await response.json();
            setProducts(json.products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = e.target;
        setFilter(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFilter = async () => {
        const response = await fetch(`https://dummyjson.com/products?limit=0&sortBy=${filter.sortBy}&order=${filter.sortOrder}`);
        const json = await response.json();
        setProducts(json.products)
    }

    return (
        <div>
            <h1>Product List</h1>
            <div className='filter-container'>
                <select name='sortBy' onChange={handleChangeFilter} className='filter-1'>
                    <option value="title">Title</option>
                    <option value="price">Price</option>
                </select>
                <select name='sortOrder' onChange={handleChangeFilter} className='filter-2'>
                    <option value='asc'>Asc</option>
                    <option value='desc'>Desc</option>
                </select>
                <button className='apply-filter' onClick={handleFilter}>Apply Filter</button>
            </div>
            <div className='container'>
                {
                    products.map(product => {
                        return (
                            <ProductCard item={product} key={product.id} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FilterAndSorting