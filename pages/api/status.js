function status(request, response) {
  response.status(200).json({ status: "API ESTÁ FUNCIONANDO NORMALMENTE!" });
}

export default status;
