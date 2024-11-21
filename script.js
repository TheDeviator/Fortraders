const questions = [
    {
      text: "Are you calm and focused?",
      options: ["Yes, I am focused", "No, I'm distracted"]
    },
    {
      text: "Have you reviewed market conditions?",
      options: ["Yes, I've reviewed", "No, I haven't"]
    },
    {
      text: "Are there any major news or events to consider?",
      options: ["Yes, I have considered those", "No, I have not"]
    },
    {
      text: "Do you have a clear trading plan?",
      options: ["Yes, I have a plan", "No, I do not"]
    },
    {
      text: "Have you set a stop loss and take profit?",
      options: ["Yes, I have set them", "No, I have not"]
    },
    {
      text: "Do you know your risk-to-reward ratio?",
      options: ["Yes, I know it", "No, I don't"]
    },
    {
      text: "Are you trading with money you can afford to lose?",
      options: ["Yes, I can afford it", "No, I cannot"]
    }
  ];
  
  let currentQuestion = 0;
  const checklistSection = document.getElementById("checklist-section");
  const encouragementSection = document.getElementById("encouragement-section");
  const loggerSection = document.getElementById("logger-section");
  
  document.getElementById("start-checklist-btn").addEventListener("click", () => {
    document.getElementById("welcome-screen").classList.remove("active");
    checklistSection.classList.add("active");
    loadQuestion();
  });
  
  function loadQuestion() {
    if (currentQuestion < questions.length) {
      const question = questions[currentQuestion];
      document.getElementById("checklist-question").textContent = question.text;
      
      const buttonsDiv = document.querySelector(".buttons");
      buttonsDiv.innerHTML = ''; // Clear existing buttons
      
      question.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.className = "btn";
        btn.addEventListener("click", () => handleAnswer(index));
        buttonsDiv.appendChild(btn);
      });
    } else {
      checklistSection.classList.remove("active");
      loggerSection.classList.add("active");
    }
  }
  
  function handleAnswer(selectedIndex) {
    if (selectedIndex === 0) { // Assuming the first option is a positive answer
      currentQuestion++;
      loadQuestion();
    } else {
      checklistSection.classList.remove("active");
      encouragementSection.classList.add("active");
    }
  }
  
  document.getElementById("return-btn").addEventListener("click", () => {
    encouragementSection.classList.remove("active");
    document.getElementById("welcome-screen").classList.add("active");
    currentQuestion = 0;
  });
  
  document.getElementById("trade-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const symbol = document.getElementById("symbol").value;
    const size = document.getElementById("size").value;
    const direction = document.getElementById("direction").value;
    const entry = parseFloat(document.getElementById("entry-price").value);
    const exit = parseFloat(document.getElementById("exit-price").value);
    const notes = document.getElementById("notes").value;
    const strategy = document.getElementById("strategy").value;
    const image = document.getElementById("image-upload").files[0];
  
    const pnl = direction === "Buy" ? (exit - entry) * size : (entry - exit) * size;
  
    const tradeLog = document.createElement("div");
    const reader = new FileReader();
    reader.onload = function () {
      const imageSrc = reader.result;
      tradeLog.innerHTML = `
        <strong>${symbol}</strong> - ${direction} ${size} units<br>
        Strategy: ${strategy}<br>
        Entry: ${entry}, Exit: ${exit}<br>
        PnL: <span style="color:${pnl >= 0 ? 'green' : 'red'};">${pnl.toFixed(2)}</span><br>
        Notes: ${notes}<br>
        ${imageSrc ? `<img src="${imageSrc}" alt="Trade screenshot" style="max-width: 100%">` : ""}
      `;
      document.getElementById("log-output").appendChild(tradeLog);
    };
  
    if (image) {
      reader.readAsDataURL(image);
    } else {
      tradeLog.innerHTML = `
        <strong>${symbol}</strong> - ${direction} ${size} units<br>
        Strategy: ${strategy}<br>
        Entry: ${entry}, Exit: ${exit}<br>
        PnL: <span style="color:${pnl >= 0 ? 'green' : 'red'};">${pnl.toFixed(2)}</span><br>
        Notes: ${notes}
      `;
      document.getElementById("log-output").appendChild(tradeLog);
    }
  
    e.target.reset();
  });
  
