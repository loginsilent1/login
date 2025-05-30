// supabaseClient.js
const supabaseUrl = 'https://svvyhcniyggnlouxnmjh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2dnloY25peWdnbmxvdXhubWpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1OTg3NTYsImV4cCI6MjA2NDE3NDc1Nn0.ogT46MSEQNn_92DE8zkbWT2TQp5PqY0PnJB3R-tueE8'; // keep secret!
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
window.supabase = supabase;
