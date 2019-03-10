import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCountries } from "../data/ducks/home/actions";
import CountriesItem from './CountriesItem';
import { Link } from 'react-router-dom';

class Home extends Component {
	static fetching({ dispatch }) {
		return [dispatch(fetchCountries())];
	}

	componentDidMount() {
		const { countries } = this.props;
		if(countries.length == 0){
			this.props.fetchCountries();
		}
		
	}

	render() {
		const { countries } = this.props;
		return (
			<div className="container">
				<div className="countries-container">
					{countries && countries.map((item, i) => <CountriesItem key={i} {...item} />)}
				</div>
			</div>
		);
	}
};


Home.defaultProps = {
	countries: []
};

const mapStateToProps = (state) => ({
	countries: state.home.countries
});

const mapDispatchToProps = {
	fetchCountries
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);