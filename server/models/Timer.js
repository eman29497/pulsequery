import mongoose from 'mongoose';
const timerSchema = new mongoose.Schema({
  duration: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['started', 'paused', 'reset'],
    default: 'reset'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Timer = mongoose.model('Timer', timerSchema);

export default Timer;