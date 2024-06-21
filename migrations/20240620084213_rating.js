/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("rating", (table) => {
      table.increments("id").primary();
      table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE")
      .notNullable();
      table
      .integer("recipe_id")
      .unsigned()
      .references("id")
      .inTable("recipe")
      .onDelete("CASCADE")
      .notNullable();
      table.decimal("rating").notNullable().defaultTo(0);
      table.timestamps(true, true);
      table.unique(["user_id", "recipe_id"]);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("rating");
  };