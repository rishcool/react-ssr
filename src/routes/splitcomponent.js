import React from 'react';
import Loadable from 'react-loadable';

export const Home = Loadable({
	loader: () => import( /* webpackChunkName: "Home" */ '../app/components/home'),
	loading() {
		return <div> Loading... </div>
	}
});

export const Country = Loadable({
	loader: () => import( /* webpackChunkName: "Country" */ '../app/components/country'),
	loading() {
		return <div> Loading... </div>
	}
});

export const LoremIpsum = Loadable({
	loader: () => import( /* webpackChunkName: "lorem-ipsum" */ '../app/components/loremIpsum'),
	loading() {
		return <div> Loading... </div>
	}
});
