const { Client } = require('pg');
const client = new Client({
  user: 'program',
  host: 'postgres',
  //host: 'postgres',
  database: 'persons',
  password: 'test',
  port: 5432,
})

client.connect(function (err){
    if(err)
        console.log(err);
    else
        console.log("Connected!");
});

const getPersons = async (request, response) => {
    //response.status(200).send('get persons1')
    const results = await client.query('SELECT * FROM Persons ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
    //client.end();
}

const getPersonById = async (request, response) => {
    const id = parseInt(request.params.personId)
    if (!id){
      response.status(400).send('no id.')
    }
    //response.status(200).send('get person by id')

    const results = await client.query('SELECT * FROM Persons WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      if (results.rowCount === 0){
        response.status(404).send('Not found')
      }
      else{
        response.status(200).json(results.rows)
      }
    })
    //client.end();
}

const createPerson = async (request, response) => {
    const { name, age, gender } = request.body
    //response.status(200).send('create person')
 
    const results = await client.query('INSERT INTO Persons (name, age, gender) VALUES ($1, $2, $3) RETURNING *',
                     [name, age, gender], (error, results) => {
      if (error) {
        throw error
      }
      //response.status(201)
      //console.log('/persons/' + results.rows[0].id)
      response.status(201).setHeader('Location', '/persons/' + results.rows[0].id).send()
    })
    //client.end();
}

const updatePerson = async (request, response) => {
    const id = parseInt(request.params.personId)
    console.log(id)
    const { name, age, gender } = request.body
    //response.status(200).send('upd person')

    const results = await client.query(
      'UPDATE Persons SET name = $1, age = $2, gender = $3 WHERE id = $4',
      [name, age, gender, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Person modified with ID: ${id}`)
      }
    )
    //client.end();
}

const deletePerson = async (request, response) => {
    const id = parseInt(request.params.personId)
    //response.status(200).send('del person')


    const results = await client.query('DELETE FROM Persons WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Person deleted with ID: ${id}`)
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