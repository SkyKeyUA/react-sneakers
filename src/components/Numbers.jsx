import React from "react";
import { useEffect } from "react";
function Numbers() {
	// const [num, setNum] = React.useState([]);
	const [num, setNum] = React.useState();
	const [tasks, setTasks] = React.useState([{ text: 'Test Task' }]);
	React.useEffect(() => {
		fetch('https://6388c77ed94a7e5040a6bb54.mockapi.io/items')
			.then((res) => res.json())
			.then((json) => setNum(json));
	}, []);
	// if (!num) {
	// 	return <h1>Loading...</h1>;
	// }
	const onClickAdd = () => {
		const text = prompt('Text task');
		setTasks([...tasks, { text }]);
	};
	const onClickEdit = (index) => {
		const text = prompt('New text task');
		setTasks(tasks.map((obj, i) => {
			if (index === i) {
				//obj.text = text;
				return { ...obj, text: text }
			}
			return obj;
		}));
	};
	const onClickRemove = (index) => {
		setTasks(tasks.filter((_, i) => i !== index));
	};
	return (
		<div>
			<center>
				<ul>
					{/* {num.map((obj) => (
					<li key={obj.id}>{obj.title}</li>
				))} */}
					{/* {num?.map((obj) => (
					<li key={obj.id}>{obj.title}</li>
				))} */}
					{tasks.map((task, i) => (<li key={i}>{task.text}
						<button onClick={() => onClickEdit(i)}>Edit</button>
						<button onClick={() => onClickRemove(i)}>X</button></li>))}
				</ul>
				<button onClick={onClickAdd}>Add</button>
			</center>
		</div>
	)
}

export default Numbers;