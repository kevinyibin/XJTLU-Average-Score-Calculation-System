function getGPA() {
    const result_dom = document.getElementsByClassName("gpa")[0];
    let gpa = 0;
    gpa = getResult() / 20 - 1;
    console.log(gpa);
    if (gpa.toString() == "NaN") {
      document.getElementById("gpa").style.display = "none";
    } else {
      result_dom.innerHTML = "您的GPA为：" + gpa.toFixed(2);
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
  let   resultArr = [];

  function checkKey(div, e) {

    document.getElementsByTagName('div')[0].innerHTML = '<center>' + document.getElementsByTagName('div')[0].innerHTML + '</center>'

    resultArr = ergodic();
    console.log(resultArr)
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
      }
    }
    return arr;
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