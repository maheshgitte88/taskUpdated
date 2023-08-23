const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users/userRoutes');
const taskRoutes = require('./routes/tasks/taskRoutes')

const PORT = 9000;
const app = express();
app.use(cors());
app.use(express.json());
const collection = 'Task'

mongoose.connect(`mongodb+srv://maheshgitte88:Mahesh!!123@cluster0.u3stwh8.mongodb.net/${collection}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log(`Connected to MongoDB collection ${collection}`);
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
    console.error('Full error:', error);
  });


app.use('/api/users', userRoutes);
app.use('/api/task', taskRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
