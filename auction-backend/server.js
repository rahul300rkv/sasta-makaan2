const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

// Replace with your actual Supabase project URL and key
const SUPABASE_URL = "https://bbzwmzdukgmorngtxusw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiendtemR1a2dtb3JuZ3R4dXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MTA5ODUsImV4cCI6MjA2OTk4Njk4NX0.BCKALZ0iPz2XSNBoI2n6taFFouX63ApYLjQZcgtZNbg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get('/properties', async (req, res) => {
  const { data, error } = await supabase.from('properties').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});


// Add more routes as needed

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
