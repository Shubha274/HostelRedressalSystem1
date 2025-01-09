const App = () => {
  const [role, setRole] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role); // Update role
      } catch (error) {
        console.error("Invalid token", error);
        setRole(null); // Reset role if invalid token
      }
    } else {
      setRole(null); // Reset role if no token
    }
  }, [token]);

  const location = useLocation();
  const isAuthRoute = location.pathname !== "/login";
  const showSidebar = isAuthRoute && location.pathname !== "/chat-app";

  return (
    <div className="app">
      {isAuthRoute && token && <Navbar />}
      {showSidebar && token && <Sidebar role={role} />}
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to={`/${role}-dashboard`} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/student-dashboard"
            element={
              role === "student" ? <StudentDboard /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/warden-dashboard"
            element={
              role === "warden" ? <WardenDboard /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              role === "admin" ? <AdminDboard /> : <Navigate to="/login" />
            }
          />
          <Route path="/issue-form" element={<Forms />} />
          <Route path="/chat-app" element={<ChatMessenger />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
};
