import React from 'react'
import AppContext from '../context';

const Info = ({ title, image, description }) => {
	const { setCartOpened } = React.useContext(AppContext);
	return (
		<div className="cart__empty empty-cart">
			<img className="empty-cart__image" src={image} alt="Empty" />
			<h2 className="empty-cart__title">{title}</h2>
			<p className="empty-cart__text">{description}</p>
			<button onClick={() => setCartOpened(false)} className="empty-cart__btn">
				<img src="/img/arrow.svg" alt="Arrow" />
				Go back
			</button>
		</div>
	);
};

export default Info;