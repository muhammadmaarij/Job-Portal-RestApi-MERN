var express = require("express");
var router = express.Router();

var Users = require("./../server/models/users");
var Company = require("./../server/models/company");
var Jobs = require("./../server/models/jobs");

/* GET users listing. */
router.post("/register", (req, res, next) => {
  Users.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => next(err));
});

router.put("/apply/:user_id/:job_id", (req, res, next) => {
  Jobs.findById(req.params.job_id)
    .then((job) => {
      Users.findByIdAndUpdate(
        { _id: req.params.user_id },
        {
          $push: {
            applied_at: {
              job_id: job._id,
            },
          },
        }, {
          new: true
        }
      ).then((user) => res.json(user));
    })
    .catch((err) => next(err));
});

router.delete("/delete-application/:user_id/:job_id", (req, res, next) => {
  Users.findByIdAndUpdate(
    { _id: req.params.user_id },
    {
      $pull: {
        applied_at: {
         job_id: req.params.job_id,
        },
      },
    }
  )
    .then((user) => res.json(user))
    .catch((err) => err);
});

router.put("/update-profile/:id", (req,res, next) => { 
  Users.findByIdAndUpdate({_id: req.params.id}, { $set: req.body }, {new: true}).then(user => {
    res.json(user);
  }).catch(err => next(err))
});

router.get("/view-jobs", (req, res, next) => {
  Jobs.find({}).exec().then(jobs => 
    res.json(jobs)
    ).catch(err => next(err))
})

router.get("/get-applications/:id", (req,res,next) => {
  Users.findById({_id: req.params.id}).populate('applied_at.job_id').then(user => {
    res.json(user)
  }).catch(err => next(err));
});
module.exports = router;
