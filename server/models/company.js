var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var companySchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    no_of_employees: {
        type: Number,
        
    },
    location: {
        type: String,
        
    },
    domain: {
        type: String,
        
    },
    jobs_posted: [{
        job_id: {
            type: Schema.Types.ObjectId,
            ref: 'Job'
        }
    }]
});

module.exports = mongoose.model('Companies', companySchema);