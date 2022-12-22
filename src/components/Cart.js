import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context';
import Info from './Info';
function Cart({ onClose, onRemove, items = [] }) {
	const { cartItems, setCartItems } = React.useContext(AppContext);
	const [isOrderComplete, setIsOrderComplete] = React.useState(false);

	const onClickOrder = () => {
		axios.post('https://6388c77ed94a7e5040a6bb54.mockapi.io/orders', cartItems);
		setIsOrderComplete(true);
		setCartItems([]);
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
										<b>450 USD</b>
									</li>
									<li className="total-cart__item">
										<span>Tax 5%:</span>
										<div></div>
										<b>22.5 USD</b>
									</li>
								</ul>
								<button onClick={onClickOrder} className="cart__checkout cart__checkout_arrow">Checkout <img src="/img/arrow.svg" alt="arrow" /></button>
							</div></div> : <Info
							title={isOrderComplete ? "Order confirmed!" : "Cart is Empty"}
							description={isOrderComplete ? "Your order №18 will be quickly transferred to courier delivery" : "Add at least one pair of sneakers to your order"}
							image={isOrderComplete ? "complete-order.jpg" : "/empty-cart.jpg"} />
				}
			</div>
		</div>
	);
}
export default Cart;