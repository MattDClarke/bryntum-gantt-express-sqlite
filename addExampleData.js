import { readFileSync } from "fs";
import sequelize from "./config/database.js";
import { Dependency, Task } from "./models/index.js";

async function setupDatabase() {
  // Wait for all models to synchronize with the database
  await sequelize.sync();

  // Now add example data
  await addExampleData();
}

async function addExampleData() {
  try {
    // Read and parse the JSON data
    const tasksData = JSON.parse(readFileSync("./initialData/tasks.json"));
    const dependenciesData = JSON.parse(readFileSync("./initialData/dependencies.json"));

    await sequelize.transaction(async (t) => {
      const tasks = await Task.bulkCreate(tasksData, { transaction: t });
      const dependencies = await Dependency.bulkCreate(dependenciesData, {
        transaction: t,
      });
      return { tasks, dependencies }; 
    });

    console.log("Tasks and dependencies added to database successfully.");
  } catch (error) {
    console.error("Failed to add data to database due to an error: ", error);
  }
}

setupDatabase();