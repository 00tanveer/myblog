// var mongoose = require("mongoose");

// var tagSchema = new mongoose.Schema({
//   fashionTags: [
//     {
//       name : String
//     }
//   ],
//   beautyTags: [
//     {
//       name: String
//     }
//   ],
//   artTags: [
//     {
//       name: String
//     }
//   ],
//   bookTags: [
//     {
//       name: String
//     }
//   ],
//   lifestyleTags: [
//     {
//       name: String
//     }
//   ],
//   genre: {
//     tags: 
//   }
// });

// const Tag = mongoose.model("Tag", tagSchema);

// module.exports = Tag;

exports.tags = Object.freeze({
  fashion: [
    'summer',
    'shoes'
  ],
  beauty: [
    'makeup',
    'skin care'
  ],
  art: [
    'sketches',
    'pen'
  ],
  books: [
    'review'
  ],
  lifestyle: [
    'travel',
    'cooking'
  ]
})
