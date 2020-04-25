import server from './serverConfig'

server.listen(3000, (err) => {
	if (err) {
		server.log.error(err)
		process.exit(1)
	}
})
