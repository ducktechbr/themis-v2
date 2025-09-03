export function startServiceOrder(answerKeyId: number) {
  const answerKeyIdString = answerKeyId.toString();
  const formData = new FormData();
  formData.append("metodo", "startServiceOrder");
  formData.append("id_service_order", answerKeyIdString);

  return fetch("https://app.sistemathemis.com//api/ws.0.0.1.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}
