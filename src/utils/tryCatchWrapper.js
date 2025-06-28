export const tryCatchWrapper = (controllerFunction) => {
  return async (req, res, next) => {
    try {
      await controllerFunction(req, res, next);
    } catch (error) {
      console.error("❌ Error:", error.message);
      res.status(500).json({ message: error.message || "Server Error" });
    }
  };
};