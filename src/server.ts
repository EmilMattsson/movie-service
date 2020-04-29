import server from './serverConfig'
import { LISTEN_PORT, LISTEN_ADDRESS } from './env';

server.listen(LISTEN_PORT, LISTEN_ADDRESS, (err) => {
	if (err) {
		server.log.error(err)
		process.exit(1)
	}
})
