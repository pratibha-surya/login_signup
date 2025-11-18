import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => 
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/signup",
        data
      );
      alert(res.data.msg);
      navigate("/login"); 
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent>
          <Typography variant="h5" className="text-center mb-6">
            Create Account
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-4">

            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              className="!bg-green-600 hover:!bg-green-700"
            >
              Signup
            </Button>
          </form>

          
          <Typography
            className="text-center mt-4 text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Already have an account? Log in
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
