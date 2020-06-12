export const preResponse = (request, h) => {
  const { response } = request;

  if (!response.isBoom) {
    return h.continue;
  }

  // const error = response;
  // const { name, code, detail } = error;
  // const ctx = {
  //   message: (error.output.statusCode === 404 ? 'page not found' : 'something went wrong'),
  //   name,
  //   code,
  //   detail,
  // };
  //
  // console.log(JSON.stringify(ctx, null, 2));
  // console.log(JSON.stringify(error, null, 2));
  // console.log(error.output.statusCode);
  // request.response = ctx;
  //

  return h.continue;
};
