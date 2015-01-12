/*
 * PromoModel
 * @brief promotional event model represents a promotion even such as a social media post, radio-ad etc
 * this alloows corellation of sales activity with prmotions activity
 */


var mongoose = require('mongoose');

var promoSchema = new mongoose.Schema({
    name : {type : String, default: ''},
    platform : {type : String, default: ''},
    details : {type : String, default: ''},
    date : {type : Date, default: ''}
}, {collection: 'promotions'});
// yes you can [have to] specifiy the collection within the schema
// see: http://stackoverflow.com/questions/5794834

module.exports = mongoose.model('PromoModel', promoSchema);