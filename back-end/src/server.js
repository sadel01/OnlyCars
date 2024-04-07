import express from 'express';
import {MongoClient} from 'mongodb';
import {carItems} from './temp-data.js';


const app = express();
const url = `mongodb+srv://admin:12345adminADMIN@cluster0.2sd1gmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(url);

app.get('/', (request, response) => {
    return response.json({ message: 'Hello' });
});

app.get('/catalog', (request, response) => {
    response.json(carItems);
});

app.get('/catalog/:id', (request, response) => {
    const carID = request.params.id;
    const car = carItems.find((car) => car.id == carID);
    return response.json(car);
});

app.listen(5174, () => {
  console.log('Server started on port 5174!');
});