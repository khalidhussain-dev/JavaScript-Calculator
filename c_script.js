// All html components

// Buttons
let AC = document.querySelector(".AC");
let back = document.querySelector(".back");
let invert = document.querySelector(".invert");
let divide = document.querySelector(".divide");
let b7 = document.querySelector(".b7");
let b8 = document.querySelector(".b8");
let b9 = document.querySelector(".b9");
let multi = document.querySelector(".multi");
let b4 = document.querySelector(".b4");
let b5 = document.querySelector(".b5");
let b6 = document.querySelector(".b6");
let minus = document.querySelector(".minus");
let b1 = document.querySelector(".b1");
let b2 = document.querySelector(".b2");
let b3 = document.querySelector(".b3");
let plus = document.querySelector(".plus");
let percentage = document.querySelector(".percentage");
let b0 = document.querySelector(".b0");
let point = document.querySelector(".point");
let equal = document.querySelector(".equal");

let numberbtn = [b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, point];
let operations = [plus, minus, multi, divide];

let buttons = document.querySelectorAll(".btn");

// Input field
let inputfield = document.querySelector(".input");
let currentValue = inputfield.value;
let btn_number = 0;

AC.addEventListener("click", (evt) => {
  inputfield.value = "";
  inputfield.focus();
});

back.addEventListener("click", () => {
  currentValue = inputfield.value;
  inputfield.value = currentValue.substring(0, currentValue.length - 1);
  inputfield.focus();
  checksize();
});

invert.addEventListener("click", () => {
  currentValue = inputfield.value;
  currentValue = -1 * currentValue;
  inputfield.value = currentValue;
});

percentage.addEventListener("click", () => {
  currentValue = inputfield.value;
  let btn_number = percentage.getAttribute("data-number");
  inputfield.value += btn_number;
  inputfield.focus();
});

numberbtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn_number = btn.getAttribute("data-number");

    if (btn_number === ".") {
      if (slicer(inputfield.value, btn_number)) return;
    }

    inputfield.value += btn_number;
    inputfield.focus();
    checksize();
  });
});

function slicer(str, val) {
  let v1 = "";
  for (i = 1; i < str.length; i++) {
    let last = str[str.length - i];
    if (last == "+" || last == "-" || last == "*" || last == "/") {
      return contains(v1, val);
    } else v1 += last;
  }
  return contains(v1, val);
}

function contains(str, value) {
  return str.includes(value);
}

operations.forEach((operat) => {
  operat.addEventListener("click", () => {
    let btn_operation = operat.getAttribute("data-number");

    if (checklast(inputfield.value))
      return signupdate(inputfield.value, btn_operation);
    inputfield.value += btn_operation;
    inputfield.focus();
  });
});

function checklast(str) {
  let last = str[str.length - 1];
  if (last == "+" || last == "-" || last == "*" || last == "/" || last == ".") {
    return true;
  } else return false;
}

function signupdate(str, val) {
  str = str.slice(0, str.length - 1) + val;
  inputfield.value = str;
  return true;
}

equal.addEventListener("click", (evt) => {
  equal_last_result();
  inputfield.focus();
});

function equal_last_result() {
  let result = 0;
  try {
    currentValue = inputfield.value;

    if (checklast(currentValue)) {
      signupdate(currentValue, "");
    }

    currentValue = inputfield.value;
    currentValue = replacer(inputfield.value, "%");
    if (currentValue != "") result = math.evaluate(currentValue);
    if (result % 1 !== 0) result = result.toFixed(4);

    inputfield.value = result;
    // console.log(result);
  } catch (error) {
    // console.log("An error occurred:", error.message);
    inputfield.value = "Syntax Error";
  }
}

function replacer(str, val) {
  for (i = 0; i < str.length; i++) {
    if (str[i] == val) {
      if (i != str.length - 1) {
        str = str.slice(0, i) + "(1/100)" + str.slice(i + 1, str.length);
        i = i + 5;
      } else str = str.slice(0, i) + "(1/100)";
    }
  }
  //   console.log(str);
  return str;
}

//  Keyboard inputs restrictions
inputfield.addEventListener("keypress", (event) => {
  //   console.log(`Key press: ${event.key} (code: ${event.code})`);

  allowedkeys = "0123456789.+-*/%";
  currentValue = inputfield.value;

  let key = event.key;
  if (!allowedkeys.includes(key)) {
    event.preventDefault();
  }
  if (key == "=" || key === "Enter") equal_last_result();

  checksize();
});

document.addEventListener("keydown", function (event) {
  if (event.code === "Backspace") {
    checksize();
  }
});

function checksize() {
  if (inputfield.value.length > 14) {
    inputfield.style.fontSize = "1.5rem";
  } else inputfield.style.fontSize = "2rem";
}
