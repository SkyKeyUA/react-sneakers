import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Cart from './components/Cart';
import Favourites from './components/Favourites';
// const cardSneakers = [
// 	{ title: "Men's Sneakers Nike Blazer Mid Suede", price: 199.99, imageUrl: "/img/sneakers/1.jpg" },
// 	{ title: "Men's Sneakers Nike Air Max 270", price: 199.99, imageUrl: "/img/sneakers/2.jpg" },
// 	{ title: "Men's Sneakers Nike Blazer Mid Suede", price: 154.99, imageUrl: "/img/sneakers/3.jpg" },
// 	{ title: "Men's Sneakers Puma X Aka Boku Future Rider", price: 159.99, imageUrl: "/img/sneakers/4.jpg" },
// 	{ title: "Men's Sneakers Under Armour Curry 8", price: 249.99, imageUrl: "/img/sneakers/5.jpg" },
// 	{ title: "Men's Sneakers Nike Kyrie 7", price: 184.99, imageUrl: "/img/sneakers/6.jpg" },
// 	{ title: "Men's Sneakers Jordan Air Jordan 11", price: 179.99, imageUrl: "/img/sneakers/7.jpg" },
// 	{ title: "Men's Sneakers Nike LeBron XVIII", price: 299.99, imageUrl: "/img/sneakers/8.jpg" },
// 	{ title: "Men's Sneakers Nike Nike Lebron XVIII Low", price: 209.99, imageUrl: "/img/sneakers/9.jpg" },
// 	{ title: "Men's Sneakers Nike Kyrie Flytrap IV", price: 184.99, imageUrl: "/img/sneakers/10.jpg" },
// ]
function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [favorites, setFavorites] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState('');
	const [cartOpened, setCartOpened] = React.useState(false);
	React.useEffect(() => {
		// fetch('https://6388c77ed94a7e5040a6bb54.mockapi.io/items').then((res) => {
		// 	return res.json();
		// }).then(json => {
		// 	setItems(json);
		// });
		axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/items').then(res => {
			setItems(res.data);
		});
		axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/cart').then(res => {
			setCartItems(res.data);
		});
	}, []);
	const onAddtoCart = (obj) => {
		axios.post('https://6388c77ed94a7e5040a6bb54.mockapi.io/cart', obj);
		setCartItems(prev => [...prev, obj]);
	}
	const onRemoveItem = (id) => {
		axios.delete(`https://6388c77ed94a7e5040a6bb54.mockapi.io/cart/${id}`);
		setCartItems(prev => prev.filter(item => item.id !== id));
	}
	const onAddToFavorite = (obj) => {
		axios.post('https://6388c77ed94a7e5040a6bb54.mockapi.io/favorites', obj);
		setFavorites(prev => [...prev, obj]);
	}
	const onRemoveToFavorite = (id) => {
		axios.delete(`https://6388c77ed94a7e5040a6bb54.mockapi.io/favorites/${id}`);
		setFavorites(prev => prev.filter(item => item.id !== id));
	}
	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	}
	return (
		<div className="wrapper">
			{cartOpened && <Cart items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
			<Header onClickCart={() => setCartOpened(true)} />
			<Routes>
				<Route path="/favourites" element={<Favourites />} />This is the test information
			</Routes>
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
							title={item.title}
							price={item.price}
							imageUrl={item.imageUrl}
							onFavorite={(obj) => onAddToFavorite(obj)}
							onPlus={(obj) => onAddtoCart(obj)}
						/>
					))}
				</div>
			</section>
		</div>
	);
}

export default App;
