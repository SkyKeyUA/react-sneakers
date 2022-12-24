import axios from 'axios';
import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';
//import { AppContext } from '../App';
function Orders() {
	const { onAddToFavorite, onAddtoCart } = React.useContext(AppContext);
	const [orders, setOrders] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	React.useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get('https://6388c77ed94a7e5040a6bb54.mockapi.io/orders');
				//console.log(data.map((obj) => obj.items).flat());
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
				setIsLoading(false);
			} catch (error) {
				alert('Error Orders in Orders');
				console.log(error);
			}
		})();
	}, []);
	return (
		<section className="content">
			<div className="content__top">
				<h1 className="content__title">My Orders</h1>
			</div>
			<div className="content__items">
				{(isLoading ? [...Array(12)] : orders).map((item, index) => (
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
				))}
			</div>
		</section>
	);
}

export default Orders;