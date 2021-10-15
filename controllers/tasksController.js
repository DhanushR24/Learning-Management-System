const Task = require('../models/task');

const task_index = (req, res) => {
    Task.find({}).sort({
        createdAt: -1
    })
    .then((result) => {
        res.render('allTasks', {
            title: 'Tasks',
            task: result
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

// const task_details = (req, res) => {
//     const id = req.params.id;

//     Task.findById(id)
//     .then(result => {
//         res.render('task', {task: result, title: 'Tasks'})
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

const task_create_get = (req, res) => {
    res.render('create', {
        title: 'Create task'
    });
}

const task_create_post = (req, res) => {

    req.body.completed = req.body.completed=="on"? true: false; 

    const newtask = new Task(req.body);

    newtask.save()
    .then((result) => {
        res.redirect('/tasks');
    })
    .catch((err) => {
        console.log(err);
        res.redirect('/tasks');
        
    })
}

const task_delete = (req, res) => {
    const id = req.params.id;

    Task.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/tasks'})
    })
    .catch(err => {
        console.log(err);
    })
}

const task_post = (req, res) => {
    const id = req.params.id;

    Task.findById(id)
    .then(result => {
        const completed = !result.completed;
        Task.findByIdAndUpdate(id, {completed})
        .then(result => {
            res.json({redirect: '/tasks'})
        })
        .catch((err)=> {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {
    task_index,
    //task_details,
    task_create_get,
    task_create_post,
    task_delete,
    task_post
}