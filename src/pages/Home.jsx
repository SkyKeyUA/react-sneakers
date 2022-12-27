import React from "react";
import Card from "../components/Card";

import { Link } from 'react-router-dom';
function Home({
	items,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	onAddToFavorite,
	onAddtoCart,
	isLoading
}) {
	const renderItems = () => {
		const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
		return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
			<Card
				key={index}
				// title={item.title}
				// price={item.price}
				// imageUrl={item.imageUrl}
				// id={item.id}
				onFavorite={(obj) => onAddToFavorite(obj)}
				onPlus={(obj) => onAddtoCart(obj)}
				loading={isLoading}
				{...item}
			/>
		))
	}
	return (
		<section className="content">
			<div className="content__top">
				<h1 className="content__title"><Link to=''>{searchValue ? `Search Results: "${searchValue}"` : 'All sneakers'}</Link></h1>
				<div className="content__search">
					<img src="img/search.svg" alt="search" />
					{searchValue && <img onClick={() => setSearchValue('')} className="item-cart__remove" src="img/btnremove.svg" alt="Clear" />}
					<input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
				</div>
			</div>
			<div className="content__items">
				{renderItems()}
			</div>
		</section>
	)
}

export default Home;