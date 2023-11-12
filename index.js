const express = require("express");
const app = express();
const getRoutes = require("./routes/getRoutes");
const ngrok = require("ngrok");


//middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.use("/api/v1/", getRoutes);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

// (async function() {
//     const url = await ngrok.connect({
//         proto: "http",
//         addr: 3001,
//         authtoken: ""
//     });
//     console.log(url);    
// })

