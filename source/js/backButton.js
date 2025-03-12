  // BACK BUTTON

  // Back Button dos Favoritos
  function createBackButton() {
    if (!document.getElementById("back-button")) {
      const backButton = document.createElement("button");
      backButton.id = "back-button";
      backButton.textContent = "Voltar";
      backButton.style.position = "absolute";
      backButton.style.top = "10px";
      backButton.style.left = "10px";
      backButton.style.padding = "10px";
      backButton.style.background = "#ffcc00";
      backButton.style.border = "none";
      backButton.style.borderRadius = "8px";
      backButton.style.cursor = "pointer";
      backButton.style.fontSize = "16px";
      backButton.style.fontWeight = "bold";
      backButton.style.color = "#202227";

      backButton.addEventListener("click", function () {
        showingFavorites = false;
        renderMovies(getAllMovies());
      });

      document.body.appendChild(backButton);
    }
  }

  // Remove o Back Button 
  function removeBackButton() {
    const backButton = document.getElementById("back-button");
    if (backButton) {
      backButton.remove();
    }
  }