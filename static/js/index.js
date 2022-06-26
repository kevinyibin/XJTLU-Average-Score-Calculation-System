function getGPA() {
  const result_dom = document.getElementsByClassName("gpa")[0];
  let gpa = 0;
  Average = getResult();
  if (Average >= 70) gpa = 4.0;
  if (Average >= 65 && Average <= 69.99) gpa = 3.6;
  if (Average >= 60 && Average <= 64.99) gpa = 3.3;
  if (Average >= 55 && Average <= 59.99) gpa = 3.0;
  if (Average >= 50 && Average <= 54.99) gpa = 2.6;
  if (Average >= 45 && Average <= 49.99) gpa = 2.3;
  if (Average >= 43 && Average <= 44.99) gpa = 2.0;
  if (Average >= 40 && Average <= 42.99) gpa = 1.0;
  if (Average >= 0 && Average <= 39.99) gpa = 0.0;

  console.log(gpa);
  if (gpa == 0) {
    document.getElementById("gpa").style.display = "none";
  } else {
    result_dom.innerHTML = "您的GPA为：" + gpa.toFixed(1);
  }
  document.getElementById("gpa").style.display = "block";
  document.getElementById("avg").style.display = "none";
}

// 弹窗
function showModal() {
  const viewBtn = document.querySelector(".view-modal"),
    popup = document.querySelector(".popup")
  popup.classList.toggle("show");
  windowFun();
}

function windowFun() {
  const viewBtn = document.querySelector(".view-modal"),
    popup = document.querySelector(".popup"),
    close = popup.querySelector(".close"),
    field = popup.querySelector(".field"),
    input = field.querySelector("input"),
    copy = field.querySelector("button");

  viewBtn.onclick = () => {
    popup.classList.toggle("show");
  }
  close.onclick = () => {
    viewBtn.click();
  }

  copy.onclick = () => {
    input.select(); //select input value
    if (document.execCommand("copy")) { //if the selected text copy
      field.classList.add("active");
      copy.innerText = "Copied!";
      setTimeout(() => {
        window.getSelection().removeAllRanges(); //remove selection from document
        field.classList.remove("active");
        copy.innerText = "Copy";
      }, 3000);
    }
  }
}

// 富文本粘贴
let index = 0;
let resultArr = [];

let yearFourArr = [];
let yearThreeArr = [];

function checkKey(div, e) {

  document.getElementsByTagName('div')[0].innerHTML = '<center>' + document.getElementsByTagName('div')[0].innerHTML + '</center>'

  ergodic();
  console.log(resultArr);
  console.log(yearFourArr);
  console.log(yearThreeArr);
}


// 遍历dom
function ergodic() {
  let arr = [];
  const tbody = document.getElementsByTagName("tbody");
  console.log(tbody.length);
  for (let tbodyIndex = 0; tbodyIndex < tbody.length; tbodyIndex++) {
    const tr = tbody[tbodyIndex].getElementsByTagName("tr");
    if (tr.length == 0) {
      const viewBtn = document.querySelector(".view-modal"),
        popup = document.querySelector(".popup")
      popup.classList.toggle("show");
      windowFun();
    }
    for (let i = 0; i < tr.length; i++) {
      if (tr[i].getElementsByTagName("td").length === 0) {
        continue;
      }
      arr.push({
        credit: parseInt(tr[i].getElementsByTagName("td")[3].innerHTML),
        mark: parseInt(tr[i].getElementsByTagName("td")[4].innerHTML.split("%")[0])
      })
      if (tbodyIndex == 0) {
        yearFourArr.push({
          credit: parseInt(tr[i].getElementsByTagName("td")[3].innerHTML),
          mark: parseInt(tr[i].getElementsByTagName("td")[4].innerHTML.split("%")[0])
        })
      }
      if (tbodyIndex == 1) {
        yearThreeArr.push({
          credit: parseInt(tr[i].getElementsByTagName("td")[3].innerHTML),
          mark: parseInt(tr[i].getElementsByTagName("td")[4].innerHTML.split("%")[0])
        })
      }
    }
  }
  resultArr = arr;
}

function getAvgFromResultArr(arr) {
  let average = 0;
  let num1 = 0, num2 = 0
  for (let i = 0; i < arr.length; i++) {
    num1 += arr[i].credit * arr[i].mark;
    num2 += arr[i].credit;
  }
  average = num1 / num2;
  return average;
}

function getDegreeAvg() {
  if (resultArr.length === 0) return;
  const result_dom = document.getElementsByClassName("result")[0];
  let yearFourAvg = getAvgFromResultArr(yearFourArr);
  let yearThreeAvg = getAvgFromResultArr(yearThreeArr);
  let average = yearThreeAvg * 0.3 + yearFourAvg * 0.7;
  result_dom.innerHTML = `您的学位平均分为: ${average.toFixed(2)} 分`;
  document.getElementById("avg1").style.display = "block";
  document.getElementById("gpa").style.display = "none";
  console.log(average);
  return average;
}

function getResult() {
  console.log(resultArr);
  if (resultArr.length === 0) return;
  const result_dom = document.getElementsByClassName("result-wrapper")[0];
  let average = 0;
  let num1 = 0, num2 = 0
  for (let i = 0; i < resultArr.length; i++) {
    num1 += resultArr[i].credit * resultArr[i].mark;
    num2 += resultArr[i].credit;
  }
  average = num1 / num2;
  result_dom.innerHTML = `您的平均分为: ${average.toFixed(2)} 分`;
  document.getElementById("avg").style.display = "block";
  document.getElementById("gpa").style.display = "none";
  console.log(average);
  return average;
}

