import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const Card = (props) => {
	return (
		<div style={{ margin: "1em" }}>
			<img src={props.imgUrl} width="120" height="120" alt="PI" />
			<div style={{ display: "inline-block", marginLeft: 10 }}>
				<div style={{ fontSize: "1.25em", fontWeight: "bold" }}>{props.name} </div>
				<div>{props.company} </div>
			</div>
		</div>
	);
};

const CardList = (props) => {
	return <div>{props.cards.map((card) => <Card key={card.id} {...card} />)}</div>;
};

class Form extends Component {
	state = {
		userName: ""
	};
	handleSubmit = (event) => {
		event.preventDefault();
		axios.get(`https://api.github.com/users/${this.state.userName}`).then((resp) => {
			this.props.onSubmit(resp.data);
			this.setState({ userName: "" });
		});
	};

	onChange = (event) => {
		return this.setState({ userName: event.target.value });
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					type="text"
					placeholder="Github Username"
					value={this.state.userName}
					onChange={this.onChange}
					required
				/>
				<button type="submit">Add Card </button>
			</form>
		);
	}
}

class App extends Component {
	state = {
		cards: []
	};

	addNewCard = (newCard) => {
		const nCard = {
			name: newCard.name,
			company: newCard.company,
			imgUrl: newCard.avatar_url
		};
		const prevState = this.state.cards;
		prevState.push(nCard);
		this.setState({ cards: prevState });
		// console.log(this.state);
	};

	render() {
		return (
			<div>
				<Form onSubmit={this.addNewCard} />
				<CardList cards={this.state.cards} />
			</div>
		);
	}
}

export default App;
