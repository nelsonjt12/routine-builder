
import { useEffect, useState } from "react";

const routineData = {
  morning: {
    bpoDays: ["Tuesday", "Thursday", "Saturday"],
    default: [
      "Cleanser – La Roche-Posay Foaming Cleanser",
      "Vitamin C Serum (optional)",
      "Niacinamide 12% + Zinc 2% – Naturium",
      "Moisturizer – CeraVe Daily Moisturizing Lotion",
      "Sunscreen – SPF 30–50",
    ],
    bpoRoutine: [
      "Cleanser – 10% Benzoyl Peroxide (target areas only)",
      "Moisturizer only",
      "Sunscreen",
    ],
  },
  evening: {
    schedule: {
      Monday: ["Cleanser", "BHA", "Moisturizer"],
      Tuesday: ["Cleanser", "Tretinoin", "Moisturizer"],
      Wednesday: ["Cleanser", "Azelaic Acid", "Moisturizer"],
      Thursday: ["Cleanser", "Tretinoin", "Moisturizer"],
      Friday: ["Cleanser", "BHA or Azelaic Acid", "Moisturizer"],
      Saturday: ["Cleanser", "Moisturizer (Recovery Night)"],
      Sunday: ["Optional: Tretinoin or AzA, or Recovery Night"],
    },
  },
};

const getTodayName = () => new Date().toLocaleDateString("en-US", { weekday: "long" });

function SkincareApp() {
  const today = getTodayName();
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem(`skincare-${today}`);
    return saved ? JSON.parse(saved) : {};
  });

  const morningTasks =
    routineData.morning.bpoDays.includes(today)
      ? routineData.morning.bpoRoutine
      : routineData.morning.default;

  const eveningTasks = routineData.evening.schedule[today] || [];

  useEffect(() => {
    localStorage.setItem(`skincare-${today}`, JSON.stringify(checked));
  }, [checked, today]);

  const toggleCheck = (task) => {
    setChecked((prev) => ({ ...prev, [task]: !prev[task] }));
  };

  const renderChecklist = (label, tasks) => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{label}</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task}>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={!!checked[task]}
                onChange={() => toggleCheck(task)}
              />
              {task}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Skincare Tracker for {today}</h1>
      {renderChecklist("🌞 Morning Routine", morningTasks)}
      {renderChecklist("🌙 Evening Routine", eveningTasks)}
    </div>
  );
}

import React from "https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js";
import ReactDOM from "https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(SkincareApp));
