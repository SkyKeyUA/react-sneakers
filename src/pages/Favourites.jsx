import Card from '../components/Card';
function Favourites(items) {
	console.log(items)
	return (
		<section className="content">
			<div className="content__top">
				<h1 className="content__title">My Favourites</h1>
			</div>
			<div className="content__items">
				{Array.isArray(items) ? items.map((item, index) => (
					<Card
						key={index}
						title={item.title}
						price={item.price}
						imageUrl={item.imageUrl}
					/>
				)) : null}
			</div>
		</section>
	)
}

export default Favourites;