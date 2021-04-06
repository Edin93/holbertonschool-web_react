import { normalize, schema } from 'normalizr';

const courseSchema = new schema.Entity("courses");

const courseArray = new schema.Array(courseSchema);
const coursesNormalizer = (data) => {
  let normalizedData = normalize(data, courseArray);
  return normalizedData;
};

module.exports = {
  courseArray,
  coursesNormalizer,
};
