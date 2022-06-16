const validateInput = (data, validationSchema) => {
  if (typeof validationSchema === "object") {
    return validationSchema.validate(data);
  } else {
    return { message: "You must use Joi validation schema" };
  }
};

export default validateInput;
