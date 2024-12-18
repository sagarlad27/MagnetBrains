const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
  },
  description: { 
    type: String,
  },
  due_date: { 
    type: String, 
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed'], 
    default: 'pending' 
  },
  priority: { 
    type: String, 
    enum: ['high', 'medium', 'low'],
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
  },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
