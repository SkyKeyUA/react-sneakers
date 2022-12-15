import Card from "../components/Card"
function Home({ cartItems, items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddtoCart }) {
	return (
		<section className="content">
			<div className="content__top">
				<h1 className="content__title"><a href="#">{searchValue ? `Search Results: "${searchValue}"` : 'All sneakers'}</a></h1>
				<div className="content__search">
					<img src="/img/search.svg" alt="search" />
					{searchValue && <img onClick={() => setSearchValue('')} className="item-cart__remove" src="/img/btnremove.svg" alt="Clear" />}
					<input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
				</div>
			</div>
			<div className="content__items">
				{items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
					<Card
						key={index}
						// title={item.title}
						// price={item.price}
						// imageUrl={item.imageUrl}
						// id={item.id}
						onFavorite={(obj) => onAddToFavorite(obj)}
						onPlus={(obj) => onAddtoCart(obj)}
						added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
						{...item}
					/>
				))}
			</div>
		</section>
	)
}

export default Home;