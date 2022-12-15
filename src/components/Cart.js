import { Link } from 'react-router-dom';
function Cart({ onClose, onRemove, items = [] }) {
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
								<button className="cart__checkout cart__checkout_arrow">Checkout <img src="/img/arrow.svg" alt="arrow" /></button>
							</div></div> :
						<div className="cart__empty empty-cart">
							<img className="empty-cart__image" src="/empty-cart.jpg" alt="Empty" />
							<h2 className="empty-cart__title">Cart is Empty</h2>
							<p className="empty-cart__text">Add at least one pair of <br /> sneakers to your order</p>
							<button onClick={onClose} className="empty-cart__btn">
								<img src="/img/arrow.svg" alt="Arrow" />
								Go back
							</button>
						</div>
				}
			</div>
		</div>
	);
}
export default Cart;