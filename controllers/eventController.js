const sessionStorage = require("sessionstorage-for-nodejs");

exports.create = (req, res) => {
  try {
    const oldEvents = sessionStorage.getItem("events") || [];
    // console.log(oldEvents[oldEvents.length - 1].id + 1);
    const id =
      oldEvents.length == 0 ? 1 : oldEvents[oldEvents.length - 1].id + 1;

    const data = {
      id,
      title: req.body.title,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
    };

    const duplicate = oldEvents.filter(
      (value) => value.title === req.body.title
    );

    if (!duplicate || duplicate.length == 0) {
      sessionStorage.setItem("events", [...oldEvents, data]);
      res.status(201).json({ status: "success", message: "Events saved" });
    } else {
      res.status(400).json({ status: "failed", message: "Duplicate title" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
};

exports.list = (req, res) => {
  try {
    const events = sessionStorage.getItem("events") || [];
    res.status(200).json({ status: "success", events });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
};

exports.update = (req, res) => {
  try {
    const oldEvents = sessionStorage.getItem("events") || [];

    const data = {
      id: req.params.id,
      title: req.body.title,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
    };

    const othersEvent = oldEvents.filter((value) => value.id != req.params.id);
    const duplicate = othersEvent.filter(
      (value) => value.title === req.body.title
    );

    if (!duplicate || duplicate.length == 0) {
      sessionStorage.setItem("events", [...othersEvent, data]);
      res.status(201).json({ status: "success", message: "Event update" });
    } else {
      res.status(400).json({ status: "failed", message: "Duplicate title" });
    }
  } catch (e) {
    res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
};

exports.delete = (req, res) => {
  try {
    const oldEvents = sessionStorage.getItem("events") || [];
    const othersEvent = oldEvents.filter((value) => value.id != req.params.id);
    sessionStorage.setItem("events", othersEvent);
    res.status(204).json({ status: "success" });
  } catch (e) {
    res.status(500).json({ status: "failed", message: "Something went wrong" });
  }
};
