import express from "express";
import "dotenv/config";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/users", async (req, res) => {
  if (!req.body.email || !req.body.name || !req.body.age) {
    return res.status(400).json({ error: "Email, name, and age are required!" });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  
  if (userExists) {
    return res.status(400).json({ error: "Email already exists" });
  }

  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.get("/users", async (req, res) => {
  let users = [];

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name ? String(req.query.name) : undefined,
        email: req.query.email ? String(req.query.email) : undefined,
        age: req.query.age ? Number(req.query.age) : undefined,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }
  res.status(200).json(users);
});

app.put("/users/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Web site-> http://localhost:3000/");
});

//http://localhost:3000/users
