// display
// 각 아이템 버튼 클릭 -> 선택한 아이템 이름 보여주기
const $itemBtns = document.querySelectorAll("#item li input");
const $showItem = document.getElementById("show-item");
for (const itemBtn of $itemBtns) {
  itemBtn.addEventListener("click", displayShowItem);
}

function displayShowItem(event) {
  let selected = event.target.value;
  $showItem.innerText = selected;
}

// status
// 현재 시간 보여주기
// 시간 버튼 클릭 -> show-time에 선택한 시간 보여주기
// add 버튼 클릭 -> total에 총 시간 보여주기, routineList에 항목 추가
// ok 버튼 클릭 -> routineList항목을 popupList로 변환 
// print 클릭 -> pop up 띄우기
const $now = document.getElementById("now");
const $showHour = document.querySelector("#show-time .h");
const $showMinute = document.querySelector("#show-time .m");
const $timeBtns = document.querySelectorAll("#time-set input");
const $totalTime = document.getElementById("total");
const $print = document.getElementById("print");
const routineList = [];
// popup
const $popup = document.getElementById("popup");
const $backdrop = document.getElementById("backdrop");
const $popupList = document.getElementById("popup-list");
const $popupTotal = document.getElementById("popup-total")
const $closeBtn = document.getElementById("close");

for (const btn of $timeBtns) {
  if (btn.className === "hour") {
    btn.addEventListener("click", (event) => {
      $showHour.innerText = event.target.value.padStart(2, "0");
    });
  } else if (btn.className === "minute") {
    btn.addEventListener("click", (event) => {
      $showMinute.innerText = event.target.value.padStart(2, "0");
    });
  } else if (btn.className === "reset") {
    btn.addEventListener("click", resetRoutine);
  } else if (btn.className === "add") {
    btn.addEventListener("click", addRoutine);
  } else if (btn.className === "ok") {
    btn.addEventListener("click", ()=>{
      $showItem.innerText = "PRINT하세요"
      addPopupList();
    });
  }
}

$print.addEventListener("click", ()=>{
  $popup.classList.remove("hidden")
  $backdrop.classList.remove("backdrop-hidden")
});
$backdrop.addEventListener("click", closePopup);
$closeBtn.addEventListener("click", closePopup);

function closePopup(){
  $popup.classList.add("hidden")
  $backdrop.classList.add("backdrop-hidden")
}

function addPopupList(){
  const li = document.createElement("li");
  const p = document.createElement("p");
  const span = document.createElement("span");
  li.append(p);
  li.append(span);
  $popupList.append(li);
  for (let i=0; i < routineList.length; i++){
    p.innerText = routineList[i].todo;
    span.innerText = `${String(routineList[i].hour).padStart(2,"0")}:${String(routineList[i].minute).padStart(2,"0")}`
  }
  $popupTotal.innerText = $totalTime.innerText;
}

function resetRoutine (){
  $showHour.innerText = "00";
  $showMinute.innerText = "00";
  $showItem.innerText = "선택하세요";
}

function addRoutine () {
  let todo = $showItem.innerText;
  let h = Number($showHour.innerText);
  let m = Number($showMinute.innerText);
  let totalH = 0;
  let totalM = 0;
  if (todo === "선택하세요"){
    return alert ("할 일을 선택해주세요");
  }
  if (h === "00" && m === "00"){
    return alert ("시간을 선택해주세요");
  }
  routineList.push({
    todo: todo,
    hour: h,
    minute: m,
  });

  totalH += h;
  totalM += m;
  $totalTime.innerText = `${String(totalH).padStart(2,"0")}:${String(totalM).padStart(2,"0")}`;
  resetRoutine();
}

function clock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  $now.innerText = `${h}:${m}:${s}`;
}

clock();
setInterval(clock, 1000);
