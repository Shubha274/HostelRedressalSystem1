const jwt = require("jsonwebtoken");

const validToken = (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Attach the decoded user data to the request object
      req.user = decoded;
      console.log("The decoded user is:", req.user);

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
};

module.exports = validToken;
