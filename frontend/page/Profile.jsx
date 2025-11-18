import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUser(res.data.user))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardContent>
          <Typography variant="h5" className="text-center mb-6">
            User Profile
          </Typography>

          {!user ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="space-y-3 text-gray-800">
              <Typography><strong>Name:</strong> {user.name}</Typography>
              <Typography><strong>Email:</strong> {user.email}</Typography>
              {user.createdAt && (
                <Typography>
                  <strong>Joined:</strong>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
              )}

              {/* If you want to show full JSON as well */}
              <pre className="bg-gray-200 p-3 rounded text-sm mt-4">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
