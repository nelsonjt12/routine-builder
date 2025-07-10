
const routineData = {
  morning: {
    bpoDays: ["Tuesday", "Thursday", "Saturday"],
    default: [
      "Cleanser – La Roche-Posay Foaming Cleanser",
      "Vitamin C Serum (optional)",
      "Niacinamide 12% + Zinc 2% – Naturium",
      "Moisturizer – CeraVe Daily Moisturizing Lotion",
      "Sunscreen – SPF 30–50"
    ],
    bpoRoutine: [
      "Cleanser – 10% Benzoyl Peroxide (target areas only)",
      "Moisturizer only",
      "Sunscreen"
    ]
  },
  evening: {
    schedule: {
      Monday: ["Cleanser", "BHA", "Moisturizer"],
      Tuesday: ["Cleanser", "Tretinoin", "Moisturizer"],
      Wednesday: ["Cleanser", "Azelaic Acid", "Moisturizer"],
      Thursday: ["Cleanser", "Tretinoin", "Moisturizer"],
      Friday: ["Cleanser", "BHA or Azelaic Acid", "Moisturizer"],
      Saturday: ["Cleanser", "Moisturizer (Recovery Night)"],
      Sunday: ["Optional: Tretinoin or AzA, or Recovery Night"]
    }
  }
};

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getTodayIndex() {
  return new Date().getDay();
}

function getNext7Days() {
  const todayIndex = getTodayIndex();
  return Array.from({ length: 7 }, (_, i) => daysOfWeek[(todayIndex + i) % 7]);
}

function loadChecklist(sectionId, title, tasks) {
  const section = document.getElementById(sectionId);
  const today = daysOfWeek[getTodayIndex()];
  const saved = JSON.parse(localStorage.getItem(`skincare-${sectionId}-${today}`) || "{}");

  const h2 = document.createElement("h2");
  h2.textContent = title;
  section.appendChild(h2);

  tasks.forEach(task => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!saved[task];
    checkbox.onchange = () => {
      saved[task] = checkbox.checked;
      localStorage.setItem(`skincare-${sectionId}-${today}`, JSON.stringify(saved));
    };
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + task));
    section.appendChild(label);
  });
}

function getRoutineForDay(day) {
  const morningTasks = routineData.morning.bpoDays.includes(day)
    ? routineData.morning.bpoRoutine
    : routineData.morning.default;

  const eveningTasks = routineData.evening.schedule[day] || [];

  return { morningTasks, eveningTasks };
}

function loadWeekView() {
  const container = document.getElementById("week-view");
  getNext7Days().forEach(day => {
    const { morningTasks, eveningTasks } = getRoutineForDay(day);
    const block = document.createElement("div");
    block.className = "day-block";

    const h3 = document.createElement("h3");
    h3.textContent = `🗓️ ${day}`;
    block.appendChild(h3);

    const morning = document.createElement("div");
    morning.innerHTML = `<strong>🌞 Morning:</strong><ul>` +
      morningTasks.map(t => `<li>${t}</li>`).join("") + `</ul>`;
    block.appendChild(morning);

    const evening = document.createElement("div");
    evening.innerHTML = `<strong>🌙 Evening:</strong><ul>` +
      eveningTasks.map(t => `<li>${t}</li>`).join("") + `</ul>`;
    block.appendChild(evening);

    container.appendChild(block);
  });
}

function init() {
  const today = daysOfWeek[getTodayIndex()];
  document.getElementById("today-label").textContent = today;

  const { morningTasks, eveningTasks } = getRoutineForDay(today);
  loadChecklist("morning", "🌞 Morning Routine", morningTasks);
  loadChecklist("evening", "🌙 Evening Routine", eveningTasks);
  loadWeekView();
}

init();
