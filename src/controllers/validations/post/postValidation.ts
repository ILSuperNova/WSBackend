import Validator from "validator";
import Helper from "../../../utils/helper";
import ErrorObject from "../error";
const isEmpty = Helper.isEmpty;

const validatePost = (data) => {
  let errors: ErrorObject = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.body = !isEmpty(data.body) ? data.body : "";
  data.communityId = !isEmpty(data.communityId) ? data.communityId : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = "body is required";
  }

  if (Validator.isEmpty(data.communityId)) {
    errors.communityId = "communityId is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validatePost;
