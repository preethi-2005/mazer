import featherIcons from "feather-icons"
import "./mazer"

featherIcons.replace()

console.log("APP JS RUNNING")

// ----------------------
// COUNT-UP FUNCTION
// ----------------------
function animateCount(id, endValue, duration = 1000) {
  const el = document.getElementById(id)
  if (!el) return

  let start = 0
  const increment = endValue / (duration / 16)

  const counter = setInterval(() => {
    start += increment

    if (start >= endValue) {
      el.innerText = endValue
      clearInterval(counter)
    } else {
      el.innerText = Math.floor(start)
    }
  }, 16)
}


// ----------------------
// FETCH DATA
// ----------------------
fetch('/data/data.json')
  .then(res => res.json())
  .then(data => {

    // ----------------------
    // 1. STATS (WITH ANIMATION)
    // ----------------------
    if (data.stats) {
      animateCount("views", data.stats.views)
      animateCount("followers", data.stats.followers)
      animateCount("following", data.stats.following)
      animateCount("posts", data.stats.posts)
    }

    // ----------------------
    // 2. USERS TABLE
    // ----------------------
    const table = document.getElementById("usersTable")

    if (table && data.users) {
      table.innerHTML = ""

      data.users.forEach(user => {
        const row = `
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="avatar avatar-sm bg-primary text-white me-2">
                  ${user.name.charAt(0)}
                </div>
                <span>${user.name}</span>
              </div>
            </td>
            <td>${user.email}</td>
            <td>
              <span class="badge bg-${user.role === 'Admin' ? 'danger' : 'secondary'}">
                ${user.role}
              </span>
            </td>
          </tr>
        `
        table.innerHTML += row
      })
    }

  })
  .catch(err => {
    console.error("Data load error:", err)
  })