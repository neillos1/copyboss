document.querySelector('form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const niche = document.getElementById('nicheInput').value.trim();
  const audience = document.getElementById('audienceInput').value.trim();
  const hook = document.getElementById('hookInput').value.trim();
  const platform = document.getElementById('platformInput').value.trim();

  if (!niche || !audience || !hook || platform === "Select a platform" || !selectedTone || videoDuration === 0) {
    alert("⚠️ Please complete all fields before generating a script.");
    return;
  }

  const prompt = `
Platform: ${platform}
Niche: ${niche}
Audience: ${audience}
Hook: ${hook}
Tone: ${selectedTone}
Video Duration: ${videoDuration}s
Write a scroll-stopping viral video script for this.
`;

  try {
    const response = await fetch("https://copyboss-backend.onrender.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (response.ok && data.choices && data.choices[0]?.message?.content) {
      document.getElementById("output").innerText = data.choices[0].message.content;
    } else {
      alert("❌ Failed to get a script. Try again.");
      console.log(data);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Error connecting to server.");
  }
});
