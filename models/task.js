const mongoose = require('mongoose');
const schema = mongoose.Schema;
const taskSchema = new schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String
    }
}, {
    timestamps: true
})

const Task = mongoose.model('task', taskSchema);

module.exports = Task;