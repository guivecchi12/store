exports.up = function(knex) {
    return knex.schema.createTable('user', tbl =>{
        tbl.increments('id')
        
        tbl.string('name')
            .notNullable()

        tbl.string('username')
            .notNullable()
            .unique()
        
        tbl.string('password')
            .notNullable()
    
        tbl.string('type')
            .notNullable()
            .defaultTo('user')
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('user')
  };
  