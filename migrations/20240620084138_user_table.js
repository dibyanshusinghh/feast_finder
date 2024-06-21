
exports.up = function (knex) {
    return knex.schema.createTable("user", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.timestamps(true, true);
    });
  };
  
exports.down = function (knex) {
    return knex.schema.dropTable("user");
};

