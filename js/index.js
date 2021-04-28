let mainList = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
};

const hexStr = "0123456789abcdef";

//Функция перевода в DEC
const transInDec = (n, s) => {
  let answer = 0;
  //Проверка введенного числа на целочисленность
  if (n.split(".")[1]) {
    //Если оно дробное, то переводим по следующему алгоритму
    let n1 = String(n.split(".")[0]);
    n1 = n1.split("").reverse().join("");
    for (let i = 0; i < n1.length; i++) {
      answer += mainList[n1[i]] * s ** i;
    }

    n1 = String(n.split(".")[1]);
    for (let i = 1; i <= n1.length; i++) {
      answer += mainList[n1[i - 1]] * s ** -i;
    }
    return answer;
  } else {
    // Если нет - по этому алгоритму
    let answer = 0;
    n = n.split("").reverse().join("");
    for (let i = 0; i < n.length; i++) {
      answer += mainList[n[i]] * s ** i;
    }
    return answer;
  }
};

//Функция перевода из DEC
const transFromDec = (n, s) => {
  //Берем целую часть числа
  let intNum = Math.trunc(n);
  //Берем дробную часть числа
  let floatNum = n - intNum;

  let answer = "";

  while (intNum != 0) {
    answer += hexStr[intNum % s];
    intNum = Math.floor(intNum / s);
  }
  answer = answer.split("").reverse().join("");
  var floatAns = "";

  while (true) {
    floatAns += hexStr[Math.trunc(floatNum * s)];
    floatNum = floatNum * s - Math.trunc(floatNum * s);
    if (floatAns.length >= 10) {
      break;
    }
  }
  if (floatAns != 0) {
    console.log(answer);
    floatAns = "." + floatAns;
    answer += floatAns;
  }
  ans.innerHTML = answer.toUpperCase();
};

//Общая функция, через которую вызываются остальные
const translateNum = () => {
  let num = document.getElementById("num").value.toLowerCase();
  let startSys = document.getElementById("startSys").value;
  let endSys = document.getElementById("endSys").value;
  var err = 0;

  //Следующие 25 строк - проверка на корректность введенных данных
  if (startSys == endSys) {
    alert("Я не предназначен для бессмысленных вычислений");
    err++;
    ans.innerHTML = "";
  }

  for (let i = 0; i < num.length; i++) {
    if ((num[i] >= Number(startSys)) & (Number(startSys) <= 10)) {
      alert("Некорректный ввод");
      err++;
      ans.innerHTML = "";
      break;
    }
    if ((mainList[num[i]] == undefined) & (num[i] != ".")) {
      alert("Некорректный ввод");
      err++;
      ans.innerHTML = "";
      break;
    }
  }

  if (num.split(".").length > 2) {
    alert("Лишние точки в числе");
    err++;
    ans.innerHTML = "";
  }

  if (!err) {
    transFromDec(transInDec(num, startSys), endSys);
  }
};
