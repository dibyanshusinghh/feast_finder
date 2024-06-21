/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("recipe", (table) => {
      table.increments("id").primary();
      table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE")
      .notNullable();
      table.string("recipe").notNullable();
      table.string("description").notNullable();
      table.specificType("ingredients", "text[]").notNullable();
      table.decimal("rating").defaultTo(0);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("recipe");
  };
