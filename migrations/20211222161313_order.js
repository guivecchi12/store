
exports.up = function(knex) {
    return knex.schema.createTable('order', tbl =>{
        tbl.increments('id')

        tbl.timestamps(true,true)

        tbl.integer('userID')
            .notNullable()
            .references('id')
            .inTable('user')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')

        tbl.integer('total_cost')
            .unsigned()
            .defaultTo(0)

        tbl.boolean('paid')
            .defaultTo(0)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('order')
};