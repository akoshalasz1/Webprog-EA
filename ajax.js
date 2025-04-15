const apiUrl = "http://gamf.nhely.hu/ajax2/";
const userCode = "OR3XCAxyz203";

function readData() {
  const formData = new URLSearchParams();
  formData.append("op", "read");
  formData.append("code", userCode);

  fetch(apiUrl, {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      const listDiv = document.getElementById("data-list");
      const statsDiv = document.getElementById("stats");
      listDiv.innerHTML = "";
      statsDiv.innerHTML = "";

      let totalHeight = 0;
      let maxHeight = 0;

      if (data.list && Array.isArray(data.list)) {
        data.list.forEach(item => {
          listDiv.innerHTML += `<p>${item.id}: ${item.name}, ${item.height} cm, ${item.weight} kg</p>`;
          const h = parseInt(item.height);
          if (!isNaN(h)) {
            totalHeight += h;
            if (h > maxHeight) maxHeight = h;
          }
        });
      }

      const avgHeight = (data.list && data.list.length > 0) ? (totalHeight / data.list.length).toFixed(2) : 0;
      statsDiv.innerHTML = `<p>Össz magasság: ${totalHeight} cm<br>Átlag: ${avgHeight} cm<br>Legnagyobb: ${maxHeight} cm</p>`;
    });
}

function createData() {
  const name = document.getElementById("create-name").value.trim();
  const height = document.getElementById("create-height").value.trim();
  const weight = document.getElementById("create-weight").value.trim();
  const msg = document.getElementById("create-msg");

  if (!name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
    msg.innerText = "Hibás vagy hiányos adatok!";
    return;
  }

  const formData = new URLSearchParams();
  formData.append("op", "create");
  formData.append("name", name);
  formData.append("height", height);
  formData.append("weight", weight);
  formData.append("code", userCode);

  fetch(apiUrl, {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(text => msg.innerText = `Válasz: ${text}`);
}

function getDataForId() {
  const id = document.getElementById("update-id").value.trim();
  const msg = document.getElementById("update-msg");
  const formData = new URLSearchParams();
  formData.append("op", "read");
  formData.append("code", userCode);

  fetch(apiUrl, {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      const item = data.list.find(d => d.id == id);
      if (item) {
        document.getElementById("update-name").value = item.name;
        document.getElementById("update-height").value = item.height;
        document.getElementById("update-weight").value = item.weight;
        msg.innerText = "Adatok betöltve.";
      } else {
        msg.innerText = `Nem található adat ezzel az ID-val: ${id}`;
      }
    })
    .catch(error => {
      msg.innerText = `Hiba történt: ${error}`;
    });
}

function updateData() {
  const id = document.getElementById("update-id").value.trim();
  const name = document.getElementById("update-name").value.trim();
  const height = document.getElementById("update-height").value.trim();
  const weight = document.getElementById("update-weight").value.trim();
  const msg = document.getElementById("update-msg");

  if (!id || !name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
    msg.innerText = "Hibás vagy hiányos adatok!";
    return;
  }

  const formData = new URLSearchParams();
  formData.append("op", "update");
  formData.append("id", id);
  formData.append("name", name);
  formData.append("height", height);
  formData.append("weight", weight);
  formData.append("code", userCode);

  fetch(apiUrl, {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(text => msg.innerText = `Válasz: ${text}`);
}

function deleteData() {
  const id = document.getElementById("delete-id").value.trim();
  const msg = document.getElementById("delete-msg");

  const formData = new URLSearchParams();
  formData.append("op", "delete");
  formData.append("id", id);
  formData.append("code", userCode);

  fetch(apiUrl, {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(text => msg.innerText = `Válasz: ${text}`);
}

function deleteUpdateId() {
  document.getElementById("update-id").value = "";
  document.getElementById("update-name").value = "";
  document.getElementById("update-height").value = "";
  document.getElementById("update-weight").value = "";
  document.getElementById("update-msg").innerText = "Mezők törölve.";
}
