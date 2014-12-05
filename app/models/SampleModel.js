// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('SampleModel', {
	name : {type : String, default: ''}
});// grab the mongoose module