let bookmarks = [];
const nameInput = document.getElementById('bookmarkName');
const urlInput = document.getElementById('bookmarkURL');
const tableContent = document.getElementById('tableContent');
const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;


function addBookmark() {
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();

  if (name.length < 3 || !urlRegex.test(url)) {
    document.getElementById("validationModal").classList.remove('d-none');
    return;
  }

  let validUrl = url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    validUrl = "https://" + url;
  }

  bookmarks.push({ name, url: validUrl });
  displayBookmarks();
  clearInputs();
}


function displayBookmarks() {
      var tableContent = "";
      for (let i = 0; i < bookmarks.length; i++) {
        tableContent += `
          <tr>
            <td>${i + 1}</td>
            <td>${bookmarks[i].name}</td>
            <td>
              <button class="btn btn-success" onclick="visitSite('${bookmarks[i].url}')">
                <i class="fa-solid fa-eye"></i> Visit
              </button>
            </td>
            <td>
              <button class="btn btn-danger" onclick="deleteBookmark(${i})">
                <i class="fa-solid fa-trash"></i> Delete
              </button>
            </td>
          </tr>
        `;
      }
      document.getElementById('tableContent').innerHTML = tableContent;
    }

function clearInputs() {
  nameInput.value = '';
  urlInput.value = '';
}


function visitSite(url) {
  window.open(url, '_blank');
}


function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  displayBookmarks();
}

function closeModal() {
  document.getElementById("validationModal").classList.add('d-none');
}
