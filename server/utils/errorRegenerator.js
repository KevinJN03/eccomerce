export default function errorRegenerator(result) {
  const newResult = {};
  result.errors.forEach(({ path, msg }) => {
    newResult[path] = msg;
  });

  return newResult;
}
