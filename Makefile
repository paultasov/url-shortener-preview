.PHONY: install db clean

# Install dependencies for both client and server
install:
	cd server && npm install
	cd client && npm install

# Initialize the database (Sequelize migrations)
db:
	cd server && npm run db

# Clean up node_modules
clean:
	rm -rf client/node_modules server/node_modules
	rm -rf client/dist
