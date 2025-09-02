import { useState } from "react";

function UserList({ users }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedUser, setSelectedUser] = useState(null);

  const usersPerPage = 10;

  // Filter users by search
  let filteredUsers = users.filter(
  (u) =>
    (u.name && u.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase()))
);

  // Sort users
  if (sortBy === "name") {
    filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "date") {
    filteredUsers.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  //New Section
  const start = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(start, start + usersPerPage);

  return (
    <div style={styles.card}>
     <h2 style={styles.title}>User List</h2>

      {/* Search and Sort */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          style={styles.input}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.select}
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Joining Date</option>
        </select>
      </div>

      {/* User Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Date Joined</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((u) => (
            <tr
              key={u.id}
              style={styles.tr}
              onClick={() => setSelectedUser(u)}
            >
              <td style={styles.td}>{u.name}</td>
              <td style={styles.td}>{u.email}</td>
              <td style={styles.td}>
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <div style={styles.pagination}>
        <button
          style={styles.button}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>
        <span style={styles.pageText}>Page {currentPage}</span>
        <button
          style={styles.button}
          disabled={start + usersPerPage >= filteredUsers.length}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div style={styles.overlay} onClick={() => setSelectedUser(null)}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>{selectedUser.name}</h3>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Date Joined:</strong>{" "}
              {new Date(selectedUser.createdAt).toLocaleDateString()}
            </p>
          <button style={styles.button} onClick={() => setSelectedUser(null)}>
              Close
          </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;

// Styling
const styles = {
  card: {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    padding: "20px",
    margin: "20px 0",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "15px",
    color: "#333",
    textAlign: "center",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  select: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "15px",
  },
  th: {
    background: "#f4f4f4",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  },
  tr: {
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },
  td: {
    padding: "10px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  button: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    background: "#2575fc",
    color: "white",
    cursor: "pointer",
  },
  pageText: {
    fontWeight: "bold",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(37, 33, 33, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
};
