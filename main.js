const scheduleContainer = document.querySelector(".profile__schedule");
const scheduleItems = scheduleContainer.querySelectorAll("li");

function updateActivities(updatedData, scheduleChoice) {
  const activities = document.querySelectorAll(".activity");
  activities.forEach((activity, index) => {
    const hours = activity.querySelector(".hours");
    const period = activity.querySelector(".period");
    hours.textContent = updatedData[index][0] + "hrs";
    period.textContent = scheduleChoice + " - " + updatedData[index][1] + "hrs";
  });
}

function filterData(data, choice) {
  let scheduleChoice =
    choice == "daily"
      ? "Yesterday"
      : choice == "weekly"
      ? "Last Week"
      : "Last Month";
  const updatedData = [];
  data.forEach((item) => {
    const current = item["timeframes"][choice]["current"];
    const previous = item["timeframes"][choice]["previous"];
    updatedData.push([current, previous]);
  });
  updateActivities(updatedData, scheduleChoice);
}

async function fetchData(choice) {
  try {
    const response = await fetch("data.json");
    if (!response.ok)
      throw new Error("Network response was not ok " + response.statusText);
    const data = await response.json();
    filterData(data, choice);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

scheduleContainer.addEventListener("click", (event) => {
  if (event.target && event.target.getAttribute("data-schedule")) {
    scheduleItems.forEach((item) => {
      item.classList.add("low-opacity");
    });
    event.target.classList.remove("low-opacity");
    const choice = event.target.getAttribute("data-schedule");
    fetchData(choice);
  }
});
