const express= require('express');
const app= express();
const chat=require("./Models/chat");
const path=require("path");
var methodOverride = require('method-override');




app.listen(8080,()=>{
   
});



app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());




app.get("/chats",async (req,res)=>{
    
    let chats= await chat.find();
 
    res.render("index.ejs",{ chats });
    
});

app.get("/chats/new",(req,res)=>{
    res.render("newChat.ejs");
})

app.post("/chats/new", (req,res)=>{

   
    let { to, message, from } = req.body;
    console.log("Params of new chat",req.params);
    let newChat=new chat({
        from:from,
        message:message,
       to:to
    });

    console.log(newChat);

    newChat.save().then((res)=>{
        console.log("New user successfully added to db")
    }).catch((error)=>{
        console.log("Error occured in while inserting the data into db");
    });

    res.redirect("/chats");

})


app.get("/chats/:id/edit", (req, res) => {
    let { id } = req.params;
    console.log(id);

    chat.findById(id)
        .then((chatData) => {  // Changed 'res' to 'chatData'
            res.render("edit.ejs", { chat: chatData }); // Now correctly passing chat data
        })
        .catch((error) => {
            console.log("Failed to find in the DB", error);
            res.status(500).send("Error fetching chat");
        });
});

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { message } = req.body;

    try {
        let updatedChat = await chat.findByIdAndUpdate(id, { message }, { new: true });
        
        if (!updatedChat) {
            return res.status(404).send("Chat not found!");
        }

        console.log("Updated chat:", updatedChat);
        res.redirect("/chats"); // Redirect after updating
    } catch (error) {
        console.log("Error updating chat:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;

    try {
        let deletedChat = await chat.findByIdAndDelete(id);

        if (!deletedChat) {
            return res.status(404).send("Chat not found!");
        }

        console.log("Deleted chat:", deletedChat);
        res.redirect("/chats"); // Redirect after deletion
    } catch (error) {
        console.log("Error deleting chat:", error);
        res.status(500).send("Internal Server Error");
    }
});



