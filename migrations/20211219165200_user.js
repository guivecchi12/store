exports.up = function(knex) {
    return knex.schema.createTable('user', tbl =>{
        tbl.increments('id')
        
        tbl.string('name')
            .notNullable()

        tbl.string('username')
            .notNullable()
        
        tbl.string('password')
            .notNullable()
    
  
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('inventory')
  };
  