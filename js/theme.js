function themeOne(themeOnePropValues) {
  themePropsArray.forEach((themeProp, index) => {
    rootStyles.setProperty(themeProp, themeOnePropValues[index]);
  });

  header.style = null;
  calcDisplay.style = null;
  resultBtn.style = null;
}

function themeTwo(themeTwoPropValues) {
  themePropsArray.forEach((themeProp, index) => {
    rootStyles.setProperty(themeProp, themeTwoPropValues[index]);
  });

  header.style.color = themeTwoPropValues[themeTwoPropValues.length - 1];
  calcDisplay.style.color = themeTwoPropValues[themeTwoPropValues.length - 1];
  resultBtn.style = null;
}

function themeThree(themeThreePropValues) {
  themePropsArray.forEach((themeProp, index) => {
    rootStyles.setProperty(themeProp, themeThreePropValues[index]);
  });

  header.style.color = themeThreePropValues[themeThreePropValues.length - 1];
  calcDisplay.style.color =
    themeThreePropValues[themeThreePropValues.length - 1];
  resultBtn.style.color = "#000";
}

function slideToggle(slideValue) {
  let slideValueString = String(slideValue);
  themeToggle.style.transform = `translateX(${slideValueString}px)`;
}

const rootStyles = document.styleSheets[1].cssRules[0].style;
const header = document.getElementsByTagName("header")[0];
const calcDisplay = document.querySelector(".calculator-display");
const resultBtn = document.querySelector("[data-result]");

const themeIndicators = Array.from(
  document.querySelectorAll("[data-theme-indicator]")
);
const themeToggle = document.querySelector(".toggle");
const themePropsArray = Array.from(rootStyles).filter(
  (rootStyle, index) => index >= 1 && index <= 10
);
const themeOnePropValues = [
  "#3a4764",
  "#232c43",
  "#182034",
  "#d03f2f",
  "#eae3dc",
  "#637097",
  "#93261a",
  "#b4a597",
  "#404e72",
  "#444b5a",
];
const themeTwoPropValues = [
  "#e6e6e6",
  "#d3cdcd",
  "#eeeeee",
  "#ca5300",
  "#e5e4e0",
  "#388187",
  "#863700",
  "#a69e90",
  "#2e5c64",
  "#2e2e26",
];
const themeThreePropValues = [
  "#17062a",
  "#1e0837",
  "#1e0836",
  "#00decf",
  "#331b4d",
  "#56077c",
  "#6df7ef",
  "#bf16f5",
  "#871f9f",
  "#f7e43a",
];

themeIndicators.forEach((themeIndicator) => {
  themeIndicator.addEventListener("click", (e) => {
    switch (e.target.textContent) {
      case "1":
        slideToggle(0);
        themeOne(themeOnePropValues);
        break;
      case "2":
        slideToggle(22);
        themeTwo(themeTwoPropValues);
        break;
      case "3":
        slideToggle(46);
        themeThree(themeThreePropValues);
        break;
      default:
        return;
    }
  });
});
