// Run only if homepage elements exist
const idea = document.getElementById("idea");

if (idea) {

  const generate = document.getElementById("generate");
  const result = document.getElementById("result");
  const copy = document.getElementById("copy");
  const toast = document.getElementById("toast");
  const clearHistoryBtn = document.getElementById("clearHistory");
  const historyList = document.getElementById("historyList");

  // ===== ENABLE BUTTON =====
  idea.addEventListener("input", () => {
    generate.disabled = idea.value.trim() === "";
  });

  // ===== TYPING EFFECT =====
  function typeText(text) {
    result.textContent = "";
    let i = 0;

    const interval = setInterval(() => {
      result.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 10);
  }

  // ===== LOAD HISTORY =====
  let history = JSON.parse(localStorage.getItem("history")) || [];

  function renderHistory() {
    historyList.innerHTML = "";

    history.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.slice(0, 40) + "...";

      li.addEventListener("click", () => {
        typeText(item);
      });

      historyList.appendChild(li);
    });
  }

  renderHistory();

  // ===== GENERATE PROMPT =====
  generate.addEventListener("click", () => {
    const text = idea.value.trim();
    const category = document.getElementById("category").value;
    const quality = document.getElementById("quality").value;

    let context = "", role = "", expectation = "";

    if (category === "coding") {
      context = "Scalable and clean architecture.";
      role = "Act as a senior developer.";
      expectation = "Provide code and explanation.";
    } 
    else if (category === "youtube") {
      context = "Focus on audience engagement.";
      role = "Act as a YouTube strategist.";
      expectation = "Provide script, hook, and title.";
    } 
    else {
      context = "Focus on growth and monetization.";
      role = "Act as a business consultant.";
      expectation = "Provide strategy and execution.";
    }

    if (quality === "advanced") {
      expectation += " Include steps and best practices.";
    } 
    else if (quality === "pro") {
      expectation += " Include expert insights and constraints.";
    }

    const output = `GOAL:
${text}

CONTEXT:
${context}

ROLE:
${role}

EXPECTATION:
${expectation}`;

    typeText(output);

    // Save to history
    history.unshift(output);
    localStorage.setItem("history", JSON.stringify(history));

    renderHistory();
  });

  // ===== COPY =====
  copy.addEventListener("click", () => {
    navigator.clipboard.writeText(result.textContent);

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  });

  // ===== CLEAR HISTORY =====
  clearHistoryBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear history?")) {
      history = [];
      localStorage.removeItem("history");
      renderHistory();
    }
  });

}