import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Info from './Info';
import { useCart } from '../hooks/useCart';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Cart({ onClose, onRemove, items = [] }) {
	const { cartItems, setCartItems, totalPrice } = useCart();
	const [isOrderComplete, setIsOrderComplete] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [orderId, setOrderId] = React.useState(null);

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post('https://6388c77ed94a7e5040a6bb54.mockapi.io/orders', {
				items: cartItems
			});
			//await axios.put('https://6388c77ed94a7e5040a6bb54.mockapi.io/cart', []);
			setOrderId(data.id);
			setIsOrderComplete(true);
			setCartItems([]);
			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete('https://6388c77ed94a7e5040a6bb54.mockapi.io/cart/' + item.id);
				await delay(1000);
			}
			// for - crutch because mockapi does not have this function
		} catch (error) {
			alert('order is failed');
		}
		setIsLoading(false);
	}
	return (
		<div className="page__cart cart">
			<div className="cart__right">
				<h2>Cart <img onClick={onClose} className="item-cart__remove" src="/img/btnremove.svg" alt="close" /></h2>
				{
					items.length > 0 ?
						<div className="cart__body"> <div className="cart__items">
							{items.map((obj) => (
								<div key={obj.id} className="cart__item item-cart">
									<Link to='/'><img width={70} height={70} className="item-cart__image" src={obj.imageUrl} alt="sneakers" /></Link>
									<div className="item-cart__text">
										<p><Link to='/'>{obj.title}</Link></p>
										<b>{obj.price} USD</b>
									</div>
									<img onClick={() => onRemove(obj.id)} className="item-cart__remove" src="/img/btnremove.svg" alt="remove" />
								</div>
							))}
						</div>
							<div className="cart__bottom">
								<ul className="cart__total total-cart">
									<li className="total-cart__item">
										<span>Total:</span>
										<div></div>
										<b>{totalPrice} USD</b>
									</li>
									<li className="total-cart__item">
										<span>Tax 5%:</span>
										<div></div>
										<b>{Math.round(totalPrice * 5) / 100} USD</b>
									</li>
								</ul>
								<button disabled={isLoading} onClick={onClickOrder} className="cart__checkout cart__checkout_arrow">Checkout <img src="/img/arrow.svg" alt="arrow" /></button>
							</div></div> : <Info
							title={isOrderComplete ? "Order confirmed!" : "Cart is Empty"}
							description={isOrderComplete ? `Your order №${orderId} will be quickly transferred to courier delivery` : "Add at least one pair of sneakers to your order"}
							image={isOrderComplete ? "complete-order.jpg" : "/empty-cart.jpg"} />
				}
			</div>
		</div>
	);
}
export default Cart;