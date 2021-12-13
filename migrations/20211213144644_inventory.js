exports.up = function(knex) {
    return knex.schema.createTable('inventory', tbl =>{
          tbl.increments('id')
          
          tbl.string('title')
              .notNullable()
  
          tbl.float('price')
              .unsigned()
              .notNullable()
          
          tbl.string('image')
              .notNullable()
  
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('inventory')
  };
  