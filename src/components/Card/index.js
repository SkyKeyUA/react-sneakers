import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";
import { Link } from 'react-router-dom';
import AppContext from "../../context";
function Card({
	id,
	title,
	price,
	imageUrl,
	onFavorite,
	onPlus,
	favourite = false,
	loading = false
}) {
	const { isItemAdded } = React.useContext(AppContext);
	const [isFavorite, setIsFavorite] = React.useState(favourite);
	const onClickPlus = () => {
		onPlus({ id, title, price, imageUrl });
	}
	const onClickFavorite = () => {
		onFavorite({ id, title, price, imageUrl });
		setIsFavorite(!isFavorite);
	}
	return (
		<div className={styles["card-sneakers"]}>
			{
				loading ? (
					<ContentLoader
						speed={2}
						width={158}
						height={224}
						viewBox="0 0 158 224"
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb">
						<rect x="0" y="0" rx="10" ry="10" width="158" height="110" />
						<rect x="0" y="120" rx="5" ry="5" width="158" height="35" />
						<rect x="0" y="192" rx="8" ry="8" width="90" height="32" />
						<rect x="126" y="192" rx="8" ry="8" width="32" height="32" />
					</ContentLoader>
				) : (
					<>
						{isFavorite ? <button className={styles["card-sneakers__favorite_pink"]} onClick={onClickFavorite}><svg width="14" height="13" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M14.5849 3.22311C14.3615 2.7098 14.0394 2.24464 13.6365 1.85368C13.2333 1.46155 12.758 1.14993 12.2363 0.935761C11.6954 0.712803 11.1152 0.59868 10.5295 0.600018C9.70772 0.600018 8.90596 0.823295 8.20921 1.24504C8.04253 1.34593 7.88418 1.45674 7.73416 1.57748C7.58414 1.45674 7.42579 1.34593 7.2591 1.24504C6.56236 0.823295 5.7606 0.600018 4.93884 0.600018C4.3471 0.600018 3.7737 0.712483 3.23198 0.935761C2.70858 1.15077 2.23686 1.46005 1.83181 1.85368C1.42843 2.2442 1.10619 2.70947 0.883373 3.22311C0.65168 3.75732 0.533333 4.32461 0.533333 4.90844C0.533333 5.45919 0.646679 6.0331 0.871705 6.61693C1.06006 7.10483 1.33009 7.61092 1.67513 8.12198C2.22186 8.93074 2.97361 9.77423 3.90705 10.6293C5.4539 12.0467 6.98574 13.0258 7.05075 13.0655L7.44579 13.3169C7.62081 13.4277 7.84584 13.4277 8.02086 13.3169L8.4159 13.0655C8.48091 13.0242 10.0111 12.0467 11.5596 10.6293C12.493 9.77423 13.2448 8.93074 13.7915 8.12198C14.1366 7.61092 14.4083 7.10483 14.5949 6.61693C14.82 6.0331 14.9333 5.45919 14.9333 4.90844C14.935 4.32461 14.8166 3.75732 14.5849 3.22311Z" fill="#FF8585" />
						</svg>
						</button> : <button className={styles["card-sneakers__favorite"]} onClick={onClickFavorite}><svg width="14" height="13" viewBox="0 0 21 19" fill="red" xmlns="http://www.w3.org/2000/svg">
							<path d="M15.1003 0C16.7293 0 18.0976 0.54932 19.2052 1.64796C20.3129 2.7466 20.8668 4.08759 20.8668 5.67092C20.8668 6.44643 20.7039 7.23002 20.3781 8.02169C20.0523 8.81335 19.6939 9.51616 19.303 10.1301C18.912 10.744 18.2523 11.5357 17.3238 12.5051C16.3953 13.4745 15.6134 14.2581 14.9781 14.8559C14.3428 15.4537 13.3248 16.3665 11.9239 17.5944L10.4089 18.9515L8.89403 17.6429C7.52572 16.3827 6.51577 15.4537 5.8642 14.8559C5.21262 14.2581 4.42258 13.4745 3.49408 12.5051C2.56559 11.5357 1.90586 10.744 1.51492 10.1301C1.12397 9.51616 0.773748 8.81335 0.464249 8.02169C0.15475 7.23002 0 6.44643 0 5.67092C0 4.08759 0.553841 2.7466 1.66152 1.64796C2.7692 0.54932 4.12123 0 5.71759 0C7.60717 0 9.17095 0.727041 10.4089 2.18112C11.6469 0.727041 13.2107 0 15.1003 0ZM10.5067 16.0918C12.1031 14.6701 13.2677 13.6118 14.0008 12.9171C14.7338 12.2224 15.5401 11.3903 16.4198 10.4209C17.2994 9.45153 17.9102 8.60332 18.2523 7.87628C18.5944 7.14924 18.7654 6.41412 18.7654 5.67092C18.7654 4.63691 18.4152 3.78061 17.7148 3.10204C17.0143 2.42347 16.1428 2.08418 15.1003 2.08418C14.3184 2.08418 13.5772 2.31037 12.8768 2.76276C12.1764 3.21514 11.6795 3.79677 11.3863 4.50765H9.43158C9.17095 3.79677 8.69041 3.21514 7.98997 2.76276C7.28952 2.31037 6.53206 2.08418 5.71759 2.08418C4.67507 2.08418 3.81173 2.42347 3.12757 3.10204C2.44342 3.78061 2.10134 4.63691 2.10134 5.67092C2.10134 6.41412 2.26423 7.14924 2.59002 7.87628C2.91581 8.60332 3.52666 9.45153 4.42258 10.4209C5.3185 11.3903 6.13297 12.2224 6.866 12.9171C7.59902 13.6118 8.74743 14.6701 10.3112 16.0918L10.4089 16.1888L10.5067 16.0918Z" fill="#9B9B9B" />
						</svg>
						</button>
						}
						<Link to='/'><img className={styles["card-sneakers__image"]} width={133} height={112} src={imageUrl} alt="Plus" /></Link>
						<h5 className={styles["card-sneakers__text"]}><Link to='/'>{title}</Link></h5>
						<div className={styles["card-sneakers__items"]}><div className={styles["card-sneakers__item"]}><span className={styles["card-sneakers__price"]}>Price:</span><b>{price} USD</b></div>
							{isItemAdded(id) ? <img className={styles["card-sneakers__btncheked"]} width={32} height={32} src={"/img/btncheked.svg"} alt="" onClick={onClickPlus} /> :
								<button className={styles["card-sneakers__btn"]} onClick={onClickPlus}>
									<span></span><span></span>
								</button>}
						</div>
					</>
				)}
		</div>
	);
}

export default Card;