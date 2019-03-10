import React from 'react';
import App from "../app/components/app";
import { Home, Country, LoremIpsum } from "./splitcomponent";


const routes = [
	{
		component: App,
		routes: [
			{
				path: "/",
				component: Home,
				exact: true,
			},
			{
				path: "/:name",
				component: Country,
				exact: true,
			},
			{
				path: "/playlists",
				component: LoremIpsum,
				exact: true,
			}
		]
	}
];


export default routes;