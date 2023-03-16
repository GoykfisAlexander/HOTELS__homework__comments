const form = document.forms.comment;
const btn = document.querySelector(".comment");
const content = document.querySelector(".content");
const submit = () => {
  if (!form.name.value || !form.aComment.value) {
    form.name.className = form.name.value ? "" : "red";
    form.aComment.className = form.aComment.value ? "" : "red";
    return;
  }
  if (/[^a-zA-Zа-яА-Я\s]/.test(form.name.value)) {
    form.name.value = "";
    form.name.className = "red";
    form.name.placeholder = "имя должно содержать только буквы и пробел";
    return;
  }
  content.insertAdjacentHTML("afterbegin", createComment());
  form.aComment.value = "";
};
const checkDate = (inputDate) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (inputDate.toDateString() === today.toDateString()) {
    return "сегодня";
  } else if (inputDate.toDateString() === yesterday.toDateString()) {
    return "вчера";
  } else {
    return inputDate.toLocaleDateString();
  }
};
const createComment = () => {
  const name = form.name.value;
  const date = form.date.value
    ? checkDate(new Date(form.date.value)) +
      ", " +
      new Date().toLocaleTimeString()
    : `сегодя, ${new Date().toLocaleTimeString()}`;
  const aComment = form.aComment.value;
  form.name.className = "";
  form.aComment.className = "";
  return `<div class="aComment"><div class="info"><span>${name}</span><span onclick="this.textContent=this.textContent==='♡'?'♥':'♡'" class="like">♡</span><span>${date}</span><span onclick="this.parentNode.parentNode.remove();" class="trash"></span></div>${aComment}</div>`;
};
btn.onclick = submit;
