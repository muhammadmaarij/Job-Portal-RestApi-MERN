var express = require("express");
var router = express.Router();

var Users = require("./../server/models/users");
var Company = require("./../server/models/company");
var Jobs = require("./../server/models/jobs");
const company = require("./../server/models/company");

/* GET users listing. */
router.post("/register", (req, res, next) => {
  Company.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => next(err));
});

router.put("/add-job/:id", (req, res, next) => {
  Jobs.create(req.body)
    .then((job) => {
      Company.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            jobs_posted: {
              job_id: job._id,
            },
          },
        },
        { new: true, upsert: false }
      ).then((company) => {
        console.log(company);
      });
      res.json(job);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/update-job/:job_id", (req, res, next) => {
  Jobs.findByIdAndUpdate(
    { _id: req.params.job_id },
    { $set: req.body },
    { new: true }
  )
    .then((job) => res.json(job))
    .catch((err) => next(err));
});

router.get("/view-jobs/:company_id", (req, res, next) => {
  Company.findById(req.params.company_id)
    .populate("jobs_posted.job_id")
    .then((jobs) => res.json(jobs))
    .catch((err) => next(err));
});

router.delete("/delete-job/:job_id", (req, res, next) => {
    Jobs.findByIdAndDelete({_id: req.params.job_id}).then(job => res.json(job)).catch(err => next(err))
});

module.exports = router;
