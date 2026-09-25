const mongoSanitize = (req, res, next) => {
  const sanitize = (obj) => {
    if (!obj || typeof obj !== "object") {
      return obj;
    }

    for (const key of Object.keys(obj)) {
      if (key.startsWith("$") || key.includes(".")) {
        delete obj[key];
        continue;
      }

      if (typeof obj[key] === "object") {
        sanitize(obj[key]);
      }
    }

    return obj;
  };

  sanitize(req.body);
  sanitize(req.params);
  sanitize(req.query);

  next();
};

export default mongoSanitize;