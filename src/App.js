import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Cart from './components/Cart';
import Favourites from './pages/Favourites';
import Home from './pages/Home';
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
	const [favourites, setFavourites] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState('');
	const [cartOpened, setCartOpened] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);
	React.useEffect(() => {
		// fetch('https://6388c77ed94a7e5040a6bb54.mockapi.io/items').then((res) => {
		// 	return res.json();
		// }).then(json => {
		// 	setItems(json);
		// });


		// axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/items').then(res => {
		// 	setItems(res.data);
		// });
		// axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/cart').then(res => {
		// 	setCartItems(res.data);
		// });
		// axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/favourites').then(res => {
		// 	setFavourites(res.data);
		// });
		async function fetchData() {
			//setIsLoading(true);
			const cartResponse = await axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/cart');
			const favouritesResponse = await axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/favourites');
			const itemsResponse = await axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/items');

			setIsLoading(false);

			setCartItems(cartResponse.data);
			setFavourites(favouritesResponse.data);
			setItems(itemsResponse.data);
		}
		fetchData();
	}, []);
	const onAddtoCart = async (obj) => {
		try {
			if (cartItems.find(cartObj => Number(cartObj.id) === Number(obj.id))) {
				axios.delete(`https://6388c77ed94a7e5040a6bb54.mockapi.io/cart/${obj.id}`);
				setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
			} else {
				const { data } = await axios.post('https://6388c77ed94a7e5040a6bb54.mockapi.io/cart', obj);
				setCartItems(prev => [...prev, data]);
			}
		} catch (error) {
			alert("it doesn't add to Cart");
		}
	}
	const onRemoveItem = (id) => {
		axios.delete(`https://6388c77ed94a7e5040a6bb54.mockapi.io/cart/${id}`);
		setCartItems(prev => prev.filter(item => item.id !== id));
	}
	const onAddToFavorite = async (obj) => {
		try {
			if (favourites.find(favObj => favObj.id == obj.id)) {
				axios.delete(`https://6388c77ed94a7e5040a6bb54.mockapi.io/favourites/${obj.id}`);
			} else {
				const { data } = await axios.post('https://6388c77ed94a7e5040a6bb54.mockapi.io/favourites', obj);
				setFavourites(prev => [...prev, data]);
			}
		} catch (error) {
			alert("it doesn't add to favourites");
		}
	}
	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	}
	return (
		<div className="wrapper">
			{cartOpened && <Cart items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
			<Header onClickCart={() => setCartOpened(true)} />
			<Routes>
				<Route path="/" element={<Home
					items={items}
					cartItems={cartItems}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					onChangeSearchInput={onChangeSearchInput}
					onAddtoCart={onAddtoCart}
					onAddToFavorite={onAddToFavorite}
					isLoading={isLoading}
				/>} />
				<Route path="/favourites/*" element={<Favourites
					items={favourites}
					onAddToFavorite={onAddToFavorite}
				/>} />
			</Routes>
		</div>
	);
}

export default App;
