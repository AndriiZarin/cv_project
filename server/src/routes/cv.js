import express from "express";
import mongodb from "mongodb";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

const validate = (data) => {
  const errors = {};

  if (!data.firstName) errors.firstName = "FirstName filed can't be blank";
  if (!data.lastName) errors.lastName = "LastName filed can't be blank";
  if (!data.img) errors.img = "Photo filed can't be blank";
  if (data.age <= 0) errors.age = "Age must be only positove value";
  if (!data.city) errors.city = "City filed can't be blank";
  if (!data.cources) errors.cources = "Cources filed can't be blank";
  if (!data.skills) errors.skills = "Skills field can't be blank";
  if (!data.contacts) errors.contacts = "Contacts field can't be blank";
  if (!data.about) errors.about = "About field can't be blank";
  if (!data.position) errors.position = "Position field can't be blank";

  return errors;
};

router.get("/", async (req, res) => {
  const db = req.app.get("db");
  await db
    .collection("cvs")
    .find({})
    .toArray((err, cvs) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ cvs });
    });
});

router.get("/:_id", (req, res) => {
  const db = req.app.get("db");
  db.collection("cvs").findOne(
    { _id: new mongodb.ObjectId(req.params._id) },
    (err, cv) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ cv });
    }
  );
});

router.post("/", authenticate, (req, res) => {
  // router.post("/", authenticate, adminOnly, (req, res) => {
  const db = req.app.get("db");
  const errors = validate(req.body.cv);

  if (Object.keys(errors).length === 0) {
    db.collection("cvs").insertOne(req.body.cv, (err, r) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ cv: r.ops[0] });
    });
  } else {
    res.status(400).json({ errors });
  }
});

router.put("/:_id", authenticate, (req, res) => {
  const db = req.app.get("db");
  const { _id, ...cvData } = req.body.cv;
  const errors = validate(cvData);

  if (Object.keys(errors).length === 0) {
    db.collection("cvs").findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params._id) },
      { $set: cvData },
      { returnOriginal: false },
      (err, r) => {
        if (err) {
          res.status(500).json({ errors: { global: err } });
          return;
        }

        res.json({ cv: r.value });
      }
    );
  } else {
    res.status(400).json({ errors });
  }
});

router.delete("/:_id", authenticate, (req, res) => {
  const db = req.app.get("db");

  db.collection("cvs").deleteOne(
    { _id: new mongodb.ObjectId(req.params._id) },
    (err) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({});
    }
  );
});

export default router;
