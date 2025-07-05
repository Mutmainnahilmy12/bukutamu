// Buku Tamu
function getEntries() {
  return JSON.parse(localStorage.getItem("guestbook")) || [];
}
function saveEntries(entries) {
  localStorage.setItem("guestbook", JSON.stringify(entries));
}
function renderEntries() {
  const guestbook = document.getElementById("guestbookEntries");
  const entries = getEntries();
  guestbook.innerHTML = entries.map(entry => `
    <div class="entry">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(entry.name)}&background=cc2366&color=fff&rounded=true&size=40" alt="avatar">
        <div>
          <strong>${entry.name}</strong><br/>
          <em>${new Date(entry.time).toLocaleString()}</em>
        </div>
      </div>
      ${entry.message}
    </div>
  `).join("");
}
document.getElementById("guestForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
  const entries = getEntries();
  entries.unshift({ name, message, time: new Date().toISOString() });
  saveEntries(entries);
  this.reset();
  renderEntries();
});
renderEntries();

// Catatan Publik
function getNotes() {
  return JSON.parse(localStorage.getItem("publicNotes")) || [];
}
function saveNotes(notes) {
  localStorage.setItem("publicNotes", JSON.stringify(notes));
}
function renderNotes() {
  const notes = getNotes();
  const noteDiv = document.getElementById("noteEntries");
  noteDiv.innerHTML = notes.map(note => `
    <div class="entry">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(note.name)}&background=dc2743&color=fff&rounded=true&size=40" alt="avatar">
        <div>
          <strong>${note.name}</strong><br/>
          <em>${new Date(note.time).toLocaleString()}</em>
        </div>
      </div>
      ${note.text}
    </div>
  `).join("");
}
document.getElementById("noteForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("noteName").value;
  const text = document.getElementById("noteText").value;
  const notes = getNotes();
  notes.unshift({ name, text, time: new Date().toISOString() });
  saveNotes(notes);
  this.reset();
  renderNotes();
});
renderNotes();

// Polling
function getPoll() {
  return JSON.parse(localStorage.getItem("pollVotes")) || {};
}
function savePoll(votes) {
  localStorage.setItem("pollVotes", JSON.stringify(votes));
}
function renderPoll() {
  const resultDiv = document.getElementById("pollResults");
  const votes = getPoll();
  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  const colors = ["Ungu", "Biru", "Pink"];
  resultDiv.innerHTML = colors.map(color => {
    const count = votes[color] || 0;
    const percent = total ? ((count / total) * 100).toFixed(1) : 0;
    return `<div>${color}: ${count} suara (${percent}%)</div>`;
  }).join("");
}
document.getElementById("pollForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const color = document.querySelector('input[name="color"]:checked');
  if (!color) return alert("Pilih salah satu!");
  const votes = getPoll();
  votes[color.value] = (votes[color.value] || 0) + 1;
  savePoll(votes);
  renderPoll();
  this.reset();
});
renderPoll();

// Tab Switching
function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}
