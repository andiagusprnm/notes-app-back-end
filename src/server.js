const Hapi = require('@hapi/hapi');
const routes = require('./routes.js');

const init = async () => {
	const server = Hapi.server({
		port: 5000,
		host: "localhost",
		routes: {
			cors: {
				origin: ['http://ec2-13-212-153-62.ap-southeast-1.compute.amazonaws.com:8000'],
			}
		}
	});

	server.route(routes);

	await server.start();
	console.log('server running on %s', server.info.uri); 
}

init();
