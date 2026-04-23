// 🔁 Handle model switching
document.getElementById("model").addEventListener("change", function () {
  const selectedModel = this.value;
  chrome.storage.local.set({ selectedModel });
  console.log("🔁 Model switched to:", selectedModel);
});

// ✅ Load selected model when popup opens
chrome.storage.local.get("selectedModel", (data) => {
  if (data.selectedModel) {
    document.getElementById("model").value = data.selectedModel;
  }
});

// 📝 Handle feedback submission
// popup.js
document.getElementById("submitFeedback").addEventListener("click", () => {
  const text = document.getElementById("feedbackText").value.trim();
  const label = document.getElementById("feedbackLabel").value;
  const model = document.getElementById("model").value;

  if (!text) {
    alert("Please enter a message.");
    return;
  }

  const feedbackData = {
    message: text,
    label: label,
    model: model,
    timestamp: new Date().toISOString()
  };

  fetch("http://localhost:8000/submit_feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(feedbackData)
  })
    .then((res) => res.json())
    .then((data) => {
      alert("✅ Feedback submitted!");
      document.getElementById("feedbackText").value = "";
    })
    .catch((err) => {
      console.error("Submission failed:", err);
      alert("❌ Failed to submit feedback.");
    });
});
