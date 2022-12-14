import Card from '../components/Card';
function Favourites({ items, onAddToFavorite }) {
	return (
		<section className="content">
			<div className="content__top">
				<h1 className="content__title">My Favourites</h1>
			</div>
			<div className="content__items">
				{items && items.map((item, index) => (
					<Card
						key={index}
						// title={item.title}
						// price={item.price}
						// imageUrl={item.imageUrl}
						// id={item.id}
						favourite={true}
						onFavorite={onAddToFavorite}
						{...item}
					/>
				))}
			</div>
		</section>
	);
}

export default Favourites;