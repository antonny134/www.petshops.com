/*
* Pet store API
* Codehooks (c) example code.
* Deploy with CLI command: coho deploy
*/
import {app, Datastore} from 'codehooks-js'

// API endpoint, jobs and queues
app.get('/pet', logStats, getPets);
app.get('/pet/:petid', getPet);
app.post('/pet', logStats, postPet);
app.put('/pet/:petid', putPet);
app.delete('/pet/:petid', deletePet);
app.get('/stats', petStats);
app.job('*/10 * * * * *', cleanUpJob);
app.worker('cleanParrots', cleanParrots);

// Get all pets
async function getPets(req, res) {
  console.debug("Get all Pets from datastore");
  const conn = await Datastore.open(); 
  conn.getMany('pets').json(res);  
}

// Find Pet by ID
async function getPet(req, res) {
  const {petid} = req.params;
  const conn = await Datastore.open();
  const data = await conn.getOne('pets', petid);
  res.json(data);
}

// Create a new Pet
async function postPet(req, res) {
  const conn = await Datastore.open();
  req.body._created = new Date().toISOString();    
  const doc = await conn.insertOne('pets', req.body);  
  res.status(201).json(doc);  
}

// Update a Pet by ID
async function putPet(req, res) {
  const {petid} = req.params;
  const conn = await Datastore.open();
  const data = await conn.updateOne('pets', petid, req.body);
  res.json(data);
}

// Delete a Pet by ID
async function deletePet(req, res) {
  const {petid} = req.params;
  const conn = await Datastore.open();
  const data = await conn.removeOne('pets', petid);
  res.json(data);
}

// Add all Parrot pets to a clean up queue
async function cleanUpJob(req, res) {
  const conn = await Datastore.open();
  const query = {type: "Parrot"}; // all Parrots
  const topic = 'cleanParrots';
  const job = await conn.enqueueFromQuery('pets', query, topic);
  console.log(job);
  res.end();
}

// Process queue to clean up Parrot names
async function cleanParrots(req, res) {  
  let {payload} = req.body;  
  if (payload.type === 'Parrot' && payload.name !== 'Polly') {
    console.log("Job", payload);
    payload.formerlyKnownAs = payload.name;
    payload.name = "Polly";
    const conn = await Datastore.open();
    const data = await conn.updateOne('pets', payload._id, payload);
  }
  res.end();
}

// Middleware to log stats
async function logStats(req, res, next) {
  const conn = await Datastore.open();
  const kval = await conn.incr(`pet_${req.method}`, 1);
  next();
}

// List all pet keys
async function petStats(req, res) {
  const conn = await Datastore.open();
  const stat = [];
  conn.getAll('pet_')  
  .on('data', (data) => {
    res.json(stat);
  }).on('end', () => {    
    res.json(stat);
  })
}

export default app.init();