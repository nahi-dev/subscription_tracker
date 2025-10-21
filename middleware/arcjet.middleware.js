import aj from "../config/arcjet.js";
// console.log("Arcjet Key:", process.env.ARCJET_API_KEY);
const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.writeHead(429, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "Too many requests. Please try again later.",
          })
        );
      } else if (decision.reason.isBot()) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "No bots allowed" }));
      } else {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Access denied" }));
      }
    }
    next();
  } catch (error) {
    console.error("Arcjet Middleware Error:", error);
    next(error);
  }
};
export default arcjetMiddleware;
