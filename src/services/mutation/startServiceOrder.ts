function startService() {
  const answerKeyIdString = answerKeyId.toString();
  const data = new FormData();
  data.append("metodo", "startServiceOrder");
  data.append("id_service_order", answerKeyIdString);

  fetch("https://app.sistemathemis.com//api/ws.0.0.1.php", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {
      console.error("Error:", error);
    });
}
