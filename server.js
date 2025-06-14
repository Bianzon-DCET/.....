const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/yourdbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })

.then(() => console.log('MongoDB connected'))   
.catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    definition: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const item = mongoose.model('Item', userSchema);

app.get('/api/items', async (req, res) => {
    try {
        const items = await item.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/items', async (req, res) => {
    try { 
        const item = await Item. 
        findByIdAndUpdate(req.params.id)
        if(item){
            item.name = req.body.name;
            item.description = req.body.description;
            const updateItem = await item.save();
            res.jsonq  (updateItem);
        }
        else {
            res.status(404).json({ error: 'Item not found' });
        }
    }
    catch (err) {
        console.error('Error updating item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (item) {
            res.json({ message: 'Item deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'Item not found' });
        }
    }
    catch (error){
        res.status(500).json({ error: 'Internal server error' });
    }
});
