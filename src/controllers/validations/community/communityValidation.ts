import Validator from "validator";
import Helper from "../../../utils/helper";
import ErrorObject from "../error";
const isEmpty = Helper.isEmpty;

const validateCommunity = (data) => {
  let errors: ErrorObject = {};
  data.title = !isEmpty(data.title) ? data.title : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateCommunity;
