module.exports = (handler) => {
  return async (req, res) => {
    try {
      const result = await handler(req, res);

      const statusCode = result && result.statusCode;

      let cleanResult = result;

      if (statusCode) {
        delete cleanResult.statusCode;
      }

      return res.status(statusCode || 200).json(cleanResult);
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ message: error.message });
    }
  };
};
