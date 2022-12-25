import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Cart from './components/Cart';
import Favourites from './pages/Favourites';
import Orders from './pages/Orders';
import Home from './pages/Home';
import AppContext from './context';
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
//export const AppContext = React.createContext({});
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
			try {
				setIsLoading(true);
				const [cartResponse, favouritesResponse, itemsResponse] = await Promise.all([
					axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/cart'),
					axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/favourites'),
					axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/items'),
				]);
				//const cartResponse = await axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/cart');
				//const favouritesResponse = await axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/favourites');
				//const itemsResponse = await axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/items');

				setIsLoading(false);
				setCartItems(cartResponse.data);
				setFavourites(favouritesResponse.data);
				setItems(itemsResponse.data);
			} catch (error) {
				alert('error when requesting data');
				console.error(error);
			}
		}
		fetchData();
	}, []);
	const onAddtoCart = async (obj) => {
		try {
			if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
				setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
				await axios.delete(`https://6388c77ed94a7e5040a6bb54.mockapi.io/cart/${obj.id}`);
			} else {
				setCartItems((prev) => [...prev, obj]);
				await axios.post('https://6388c77ed94a7e5040a6bb54.mockapi.io/cart', obj);
			}
		} catch (error) {
			alert("it doesn't add to Cart");
			console.error(error);
		}
	}
	const onRemoveItem = async (id) => {
		try {
			setCartItems(prev => prev.filter(item => item.id !== id));
			await axios.delete(`https://6388c77ed94a7e5040a6bb54.mockapi.io/cart/${id}`);
		} catch (error) {
			alert("it doesn't delete from the Cart");
			console.error(error);
		}
	}
	const onAddToFavorite = async (obj) => {
		try {
			if (favourites.find(favObj => favObj.id == obj.id)) {
				axios.delete(`https://6388c77ed94a7e5040a6bb54.mockapi.io/favourites/${obj.id}`);
				setFavourites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
			} else {
				const { data } = await axios.post('https://6388c77ed94a7e5040a6bb54.mockapi.io/favourites', obj);
				setFavourites(prev => [...prev, data]);
			}
		} catch (error) {
			alert("it doesn't add to favourites");
			console.error(error);
		}
	}
	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	}
	const isItemAdded = (id) => {
		return cartItems.some(obj => Number(obj.id) === Number(id));
	}
	return (
		<AppContext.Provider value={{
			items,
			cartItems,
			favourites,
			isItemAdded,
			onAddToFavorite,
			onAddtoCart,
			setCartOpened,
			setCartItems,
		}}>
			<div className="wrapper">
				<Cart items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
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
					/>} />
					<Route path="/orders/*" element={<Orders
					/>} />
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
