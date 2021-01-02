const DB = require("../../config/BD_conection");



function find(filters, table) {
    let query = `SELECT * FROM ${table}`

  if(filters){
    Object.keys(filters).map(key => {
      query = ` ${query} ${key}`


      Object.keys(filters[key]).map(field => {
          query = `${query} ${field} = '${filters[key][field]}'`
      })

   })

  }

  

    return DB.query(query)
}





const Base = {


  init({ table }) {
    if (!table) throw new Error(" invalid Params ");

    this.table = table;

    return this;
  },

  async find(id){
    
    let results = await find({where : {id} } , this.table)
    return results.rows[0]
  }, 

  // check if email and cpfncpj existes || users
  async findOne(filters) {
    try {
      let query = `SELECT * FROM ${this.table}`;

      Object.keys(filters).map((key) => {
        //where || or
        query = `${query}
         ${key}
        `;

        Object.keys(filters[key]).map((field) => {
          query = `${query} ${field} = '${filters[key][field]}'`;
        });
      });

      const results = await DB.query(query);

      return results.rows[0];
    } catch (error) {
      console.error(error);
    }
  },

  async findAll(filters){
    const results = await find( filters, this.table )

    return results.rows
  }, 



  async create(fields) {
    try {
      let keys = [],
        values = [];

      Object.keys(fields).map((key) => {
        //inserindo os dados no DB

        keys.push(key); //  name, age, email
        values.push(`'${fields[key]}'`); // "samuel" , "24", "spa@gmail.com"
      });

      const query = `INSERT INTO ${this.table} (${keys.join(",")})
    VALUES(${values.join(',')}) 
    RETURNING id
    `;

      const results = await DB.query(query);
      return results.rows[0].id;
    } catch (error) {
      console.error(error);
    }
  },



  update(id, fields) {
    try {
      let update = [];

      Object.keys(fields).map((key) => {
        //  category_id = ($1),

        const line = `${key} = '${fields[key]}'`;
        update.push(line);
      });

      let query = ` UPDATE ${this.table} SET 
    ${update.join(",")} WHERE id = ${id}
    `;

      return DB.query(query);
    } catch (error) {
      console.error(error);
    }
  },


  delete(id){
    return DB.query(`DELETE FROM ${this.table} WHERE id = $1`, [id])
  }
};

module.exports = Base;
