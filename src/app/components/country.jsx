import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCountry } from "../data/ducks/home/actions";

class Country extends Component {
	static fetching({ dispatch, match }) {
		return [dispatch(fetchCountry(match.params.name))];
	}

	componentDidMount() {
		this.props.fetchCountry(this.props.match.params.name);
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.match.params.name != nextProps.match.params.name){
			this.props.fetchCountry(nextProps.match.params.name);
		}
	}


	render() {
		const { country } = this.props;
		if(country.length == 0){
			return <div>Loading ...</div>
		}
		return (
			<div className="container">
				<div className="countries-container">
					<div className="countries-item-data">
						<h4>{country.name}</h4>
						<div>{country.capital}</div><br/>
						<div>{country.population} population.</div><br/>
						<div>{country.borders.join(', ')}</div><br/>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => ({
	country: state.home.country
});

const mapDispatchToProps = {
	fetchCountry
};

export default connect(mapStateToProps, mapDispatchToProps)(Country);