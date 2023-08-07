const Doctor = require("../models/doctor");
const Patient = require("../models/Patient");
const jwt = require("jsonwebtoken");

module.exports.registerDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);

    res.status(200).json({
      success: true,
      message: "doctor created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not create a doctor, internal server error",
    });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const doctor = Doctor.find(req.body);

    if (doctor && doctor.name) {
      const token = jwt.sign(doctor.id, "secret");
      res.status(200).json({
        success: true,
        token: token,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Name or Password do match",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

module.exports.registerPatient = async (req, res, next) => {
  try {
    req.body.doctor = "63e8a23719d4e263967bd3c1";
    const patient = await Patient.create(req.body);

    res.status(200).json({
      success: true,
      message: "succesfully created a patient",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not create a  patient,internal server error",
    });
  }
};

module.exports.createReport = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    req.body.date = Date.now();

    patient.reports.push(req.body);

    patient.save();

    res.status(200).json({
      success: true,
      message: "report submitted succesfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not created a  report, internal server error",
    });
  }
};

module.exports.all_reports = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    res.status(200).json({
      success: true,
      reports: patient.reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not able to fetch the patient reports",
    });
  }
};

module.exports.AllReports = async (req, res, next) => {
  try {
    const patient = await Patient.find({
      reports: { $elemMatch: { status: req.params.status } },
    });

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not able to fetch the reports",
    });
  }
};
