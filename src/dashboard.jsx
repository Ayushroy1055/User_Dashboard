import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid ,PieChart, Pie, Cell, Legend  } from "recharts";
// import { PieChart, Pie, Cell, Legend } from "recharts";
import { useState } from "react";
import UserList from "./userlist";

function Dashboard({ users }) {
  const [showUserList, setShowUserList] = useState(false);
  return (
    <div style={styles.dashboard}>
      {/* Total Users  */}
      <div style={{ ...styles.card, ...styles.totalUsers, height: "100px" }}>
        <h2 style={{ textAlign: "left", paddingLeft: "50px" ,marginTop:"40px" }}>Total Users  :---------------- </h2>
        <p style={styles.bigNumber}>{users.length}</p>
      </div>

      {/* Charts Row */}
      <div style={styles.chartsRow}>
        <div style={styles.card}>
          <h3>Users Created Per Day</h3>
          <UsersPerDayChart users={users} />
        </div>
        
      </div>

      {/* Recently Joined */}
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={styles.card}>
          <h3>Avatar Distribution</h3>
          <AvatarDistribution users={users} />
        </div>
      <div style={styles.card}>
        <RecentUsers users={users} />
        </div>
    </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
  <button
    style={{
      marginTop: "30px",
      padding: "10px 24px",
      background: "#2575fc",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer"
    }}
    onClick={() => setShowUserList((prev) => !prev)}
  >
    {showUserList ? "Hide User List" : "Click to View User List"}
  </button>
</div>

      {/* Conditionally render UserList */}
      {showUserList && (
        <div style={styles.card}>
          
          <UserList users={users} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;

// 

function RecentUsers({ users }) {
  const sorted = [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const recent = sorted.slice(0, 5);

  return (
    <div>
      <h3>Recently Joined</h3>
      <ul style={styles.recentUsers}>
        {recent.map(u => (
          <li key={u.id} style={styles.recentUserItem}>
            <img src={u.avatar} alt={u.name} style={styles.avatar} />
            <div>
              <strong>{u.name}</strong>
              <p>{new Date(u.createdAt).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AvatarDistribution({ users }) {
  const withAvatar = users.filter(u => u.avatar).length;
  const withoutAvatar = users.length - withAvatar;

  const data = [
    { name: "With Profile Picture", value: withAvatar },
    { name: "Without Profile Picture", value: withoutAvatar }
  ];
  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}

function UsersPerDayChart({ users }) {
  const counts = {};
  users.forEach(u => {
    const date = new Date(u.createdAt).toISOString().split("T")[0];
    counts[date] = (counts[date] || 0) + 1;
  });

  const data = Object.keys(counts).map(date => ({ date, count: counts[date] }));

  return (
    <LineChart width={1000} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="count" stroke="#4CAF50" strokeWidth={2} />
    </LineChart>
  );
}

// styling
const styles = {
  dashboard: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    padding: "1px",
    margin: "15px 0",
    flex: 1,
  },
  totalUsers: {
    textAlign: "right",
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    color: "white",
  },
  bigNumber: {
    fontSize: "3rem",
    marginTop: "-60px",
    paddingRight: "50px"
  },
  chartsRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  recentUsers: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  recentUserItem: {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "15px",
  },
};
