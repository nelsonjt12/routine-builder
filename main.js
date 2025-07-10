
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

function getTodayName() {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
}

function loadChecklist(sectionId, title, tasks) {
  const section = document.getElementById(sectionId);
  const today = getTodayName();
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

function init() {
  const today = getTodayName();
  document.getElementById("title").textContent = `Skincare Tracker – ${today}`;

  const morningTasks = routineData.morning.bpoDays.includes(today)
    ? routineData.morning.bpoRoutine
    : routineData.morning.default;

  const eveningTasks = routineData.evening.schedule[today] || [];

  loadChecklist("morning", "🌞 Morning Routine", morningTasks);
  loadChecklist("evening", "🌙 Evening Routine", eveningTasks);
}

init();
