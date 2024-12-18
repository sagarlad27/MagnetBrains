const mongoose = require('mongoose');

const prioritySchema = new mongoose.Schema({
  priority_name: { 
    type: String, 
    required: true, 
    unique: true 
},
  color_code: { 
    type: String, 
    required: true  // e.g., "#FF0000" for red
},
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Priority', prioritySchema);
