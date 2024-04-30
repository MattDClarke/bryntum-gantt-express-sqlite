import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { Dependency, Task } from "./models/index.js";

global.__dirname = path.resolve();

const port = 1337;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/node_modules/@bryntum/gantt")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/load", async (req, res) => {
  try {
    const tasksPromise = Task.findAll();
    const dependenciesPromise = Dependency.findAll();
    const [tasks, dependencies] = await Promise.all([
      tasksPromise,
      dependenciesPromise,
    ]);
    res.send({
      success: true,
      tasks: {
        rows: tasks,
      },
      dependencies: {
        rows: dependencies,
      },
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Tasks and dependencies could not be loaded",
    });
  }
});

app.post("/sync", async function (req, res) {
  const { requestId, tasks, dependencies } = req.body;
  try {
    const response = { requestId, success: true };
    // if task changes are passed
    if (tasks) {
      const rows = await applyTableChanges("tasks", tasks);
      // if got some new data to update client
      if (rows) {
        response.tasks = { rows };
      }
    }
    // if dependency changes are passed
    if (dependencies) {
      const rows = await applyTableChanges("dependencies", dependencies);
      // if got some new data to update client
      if (rows) {
        response.dependencies = { rows };
      }
    }
    res.send(response);
  } catch (error) {
    res.send({
      requestId,
      success: false,
      message: "There was an error syncing the data changes",
    });
  }
});

async function applyTableChanges(table, changes) {
  let rows;
  if (changes.added) {
    rows = await createOperation(changes.added, table);
  }
  if (changes.updated) {
    await updateOperation(changes.updated, table);
  }
  if (changes.removed) {
    await deleteOperation(changes.removed, table);
  }
  // if got some new data to update client
  return rows;
}

function createOperation(added, model) {
  return Promise.all(
    added.map(async (record) => {
      const { $PhantomId, ...data } = record;

      let result;
      if (model === 'tasks') {
        result = await Task.create(data);
      }
      if (model === 'dependencies') {
        result = await Dependency.create(data);
      }
      // Report to the client that the record identifier has been changed
      return { $PhantomId, id: result.id }; 
    })
  );
}

function updateOperation(updated, model) {
  return Promise.all(
    updated.map(
      ({ $PhantomId, id, ...data }) => {

        if (model === "tasks") {
          return Task.update(data, { where: { id } }).then(() => ({
            $PhantomId,
            id,
          }));
        }
        if (model === "dependencies") {
          return Dependency.update(data, { where: { id } }).then(() => ({
            $PhantomId,
            id,
          }));
        }
      }
    )
  );
}

function deleteOperation(deleted, model) {
  // Extract all ids from the deleted records array
  const ids = deleted.map(({ id }) => id);
  
  if (model === "tasks") {
    return Task.destroy({
      where: {
        id: ids,
      },
    });
  }
  if (model === "dependencies") {
    return Dependency.destroy({
      where: {
        id: ids,
      },
    });
  }
}

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
