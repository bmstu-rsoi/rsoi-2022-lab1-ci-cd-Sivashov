const { Client } = require('pg');
connectionstr = process.env.DATABASE_URL
/*const client = new Client({
  user: 'program',
  host: 'postgres',
  //host: 'postgres',
  database: 'persons',
  password: 'test',
  port: 5432,
})*/

/*const client = new Client({
  user: 'mkhyaqnvpndrpe',
  host: 'ec2-52-211-232-23.eu-west-1.compute.amazonaws.com',
  //host: 'postgres',
  database: 'd1mdo3ep17armp',
  password: '2a3b24a46ec91a053cc6570f681fa4db8c07ee4763afadf0c7ee278e92f36a2b',
  port: 5432,
})*/
const conString =
  process.env.DATABASE_URL ||
  "postgres://mkhyaqnvpndrpe:2a3b24a46ec91a053cc6570f681fa4db8c07ee4763afadf0c7ee278e92f36a2b@ec2-52-211-232-23.eu-west-1.compute.amazonaws.com:5432/d1mdo3ep17armp";

const client = new Client({
  connectionString: conString,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();


client.connect(function (err){
    if(err)
        console.log(err);
    else
        console.log("Connected!");
});

const getPersons = async (request, response) => {
    //response.status(200).send('get persons1')
    const results = await client.query('SELECT * FROM Persons ORDER BY id ASC', (error, results) => {
      response.status(200).json(results.rows)
    })
    //client.end();
}

const getPersonById = async (request, response) => {
    const id = parseInt(request.params.personId)
    //if (!id){
    //  response.status(400).send('no id.')
    //}
    //response.status(200).send('get person by id')

    const results = await client.query('SELECT * FROM Persons WHERE id = $1', [id], (error, results) => {
      if (results.rowCount === 0){
        response.status(404).json(null)
      }
      else{
        response.status(200).json(results.rows[0])
      }
    })
    //client.end();
}

const createPerson = async (request, response) => {
    const { name, address, work, age } = request.body
    //response.status(200).send('create person')
 
    const results = await client.query('INSERT INTO Persons (name, address, work, age) VALUES ($1, $2, $3, $4) RETURNING *',
                     [name, address, work, age], (error, results) => {
      //response.status(201)
      console.log(error)
      //console.log('/persons/' + results.rows[0].id)
      response.status(201).header('Location', '/api/v1/persons/' + results.rows[0].id).json("")
    });
    //client.end();
}

const updatePerson = async (request, response) => {
    const id = parseInt(request.params.personId)
    console.log(id)
    const { name, address } = request.body
    //response.status(200).send('upd person')

    const results = await client.query(
      'UPDATE Persons SET name = $1, address = $2 WHERE id = $3 RETURNING *',
      [name, address, id],
      (error, results) => {
        if (error) {
          res.status(400).json(null)
        }
        else{
          response.status(200).json(results.rows[0])
        }
        
      }
    )
    //client.end()
}

const deletePerson = async (request, response) => {
    const id = parseInt(request.params.personId)
    //response.status(200).send('del person')


    const results = await client.query('DELETE FROM Persons WHERE id = $1', [id], (error, results) => {
      response.status(204).json(null)
    })
    //client.end();
}

module.exports = {
    getPersons,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson,
  }