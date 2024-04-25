const express = require('express');
const app = express();

const mongo = require('mongoose');

const url = 'mongodb+srv://SUBRAT:Subrat1234@cluster0.ffowr9p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000 }).then(() => {
    console.log("DataBase Connected");
})



const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.static('static'))

app.use(bodyParser.json());


const schema = mongo.Schema({
    title: String,
    description: String,
    date: String
})

const model = mongo.model('Collection', schema);



app.post('/createtask', async(req, res) => {
    const { title, desc } = req.body;

    const currentDate = new Date();

    const task = new model();
    task.title = title;
    task.description = desc;
    task.date = currentDate;

    const saved = await task.save();

    if (!saved) {
        console.log("data not saved");
    } else {
        console.log("Data saved Successfully");
    }

    res.send("task created sucessfully");
})

app.post('/updatetask', async(req, res) => {
    const { title, description, id } = req.body;
    const task = await model.findByIdAndUpdate(id, { title, description }, { new: true });
    const saved = await task.save();
    if (!saved) {
        console.log("data not updated");
    } else {
        console.log("Data updated Successfully");
    }
    res.send("task update sucessfully");
})

app.get('/todolists', async(req, res) => {
    const data = await model.find({});
    // console.log(data);
    res.send(data);
})

app.delete('/deletetask/:id', async(req, res) => {
    const taskid = req.params.id;
    const taskdel = await model.findByIdAndDelete(taskid);
})




app.listen(3200, () => {
    console.log("server listen");
})