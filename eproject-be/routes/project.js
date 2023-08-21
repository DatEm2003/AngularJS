const router = require("express").Router();

const Project = require("../models/project");
const config = require("../config");
const project = require("../models/project");

router.post("/", async (req, res, next) => {
  let project = new Project();

  project.name = req.body.name;
  project.startDate = req.body.startDate;
  project.endDate = req.body.endDate;
  project.teamSize = req.body.teamSize;
  project.budget = req.body.budget;
  project.expense = req.body.expense;
  project.status = req.body.status;

  try {
    project = await project.save();

    res.json({
      success: true,
      message: "The project created successfully",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "The project can be not created",
      error: error,
    });
  }
});

router.get("/", async (req, res) => {
  const project = await Project.find();

  if (!project) {
    return res.status(500).json({
      success: false,
      message: "No project existed",
    });
  }
  res.json({
    success: true,
    data: project,
  });
});

router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(500).json({
      success: false,
      message: "The project width the given ID was not found",
    });
  }
  res.json({
    success: true,
    data: project,
  });
});

router.delete("/:id", async (req, res) => {
  Project.findByIdAndRemove(req.params.id)
    .then((project) => {
      if (project) {
        return res.status(200).json({
          success: true,
          message: "The project is deleted",
        });
      }
      return res.status(404).json({
        success: false,
        message: "The project width the given ID was not found",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "The project width cannot be deleted",
        error: error,
      });
    });
});

router.put("/:id", async (req, res, next) => {
  const projectExist = await Project.findById(req.params.id);

  if (!projectExist) {
    return res.status(404).json({
      success: false,
      message: "The project not found",
    });
  }

  let project = {
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    teamSize: req.body.teamSize,
    budget: req.body.budget,
    expense: req.body.expense,
    status: req.body.status,
  };

  try {
    const pro = await Project.findByIdAndUpdate(req.params.id, project, {
      new: true,
    });
    res.json({
      success: true,
      data: pro,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "The project can be not updated",
      error: error,
    });
  }
});

module.exports = router;
