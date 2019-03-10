import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Helmet from "react-helmet";

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return ( 
			<Fragment>
				<Helmet
                    defaultTitle="iDiva"
                    titleTemplate="%s"
                    titleAttributes={{itemprop: "name", lang: "en"}}
                    meta={[
                        {property: "og:site_name", content: "iDiva"},
                        {name: "twitter:card", content: "summary_large_image"},
                        {property: "og:title", content: "%s"},
						{property: "og:type",  content: "website"},
						{name: "viewport",  content: "width=device-width, initial-scale=1.0"},
						{name: "theme-color",  content: "#ff0037"},
                    ]}
                />
				<p><Link to={'/'}>Home</Link>
				<Link to={'/playlists'}>Playlist</Link></p>
				<div>{renderRoutes(this.props.route.routes)}</div>
			</Fragment>
		)
	}
}

export default App;