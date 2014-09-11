var DS = require('nedb')
,	Path = require('path')

module.exports = function StoreMan (path, compactionInterval) {
	var self = this
	if (typeof(path) != 'string')
		path = process.cwd()
	self._path = path
	self._stores = {}
	self.load = function (name, memStore) {
		// Skip if the store already exists
		if (!self._stores[name]) {
			// Load the new docset
			if (memStore) {
				self._stores[name] = new DS()	
			} else {
				self._stores[name] = new DS({
					autoload: true,
					filename: Path.join(self._path, name+'.db')
				})
			}
			// Set autocompaction
			if (compactionInterval)
				self._stores[name].persistence
				.setAutocompactionInterval(compactionInterval)
			// Define the getter for the store
			Object.defineProperty(self, name, {
				get: function () {
					return self._stores[name]
				}
			})
		}
		return self
	}
	return self
}