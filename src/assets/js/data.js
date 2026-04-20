document.addEventListener("DOMContentLoaded", () => {
  console.log("JS LOADED");

  fetch('/data/data.json')
    .then(res => res.json())
    .then(data => {
      console.log("DATA:", data);

      document.getElementById("views").innerText = data.stats.views;
      document.getElementById("followers").innerText = data.stats.followers;
      document.getElementById("following").innerText = data.stats.following;
      document.getElementById("posts").innerText = data.stats.posts;

      const table = document.getElementById("usersTable");

      if (table) {
        table.innerHTML = "";

        data.users.forEach(user => {
          table.innerHTML += `
            <tr>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.role}</td>
            </tr>
          `;
        });
      }
    })
    .catch(err => console.error(err));
});