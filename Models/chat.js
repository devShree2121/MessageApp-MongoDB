const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MessageDB');


}

const chatSchema=new mongoose.Schema({

    from:{
        type:String,
        require:true,
    },
    message:{
        type:String,
    },
    to:{
        type:String,
        require:true,
    }
});

const chat= mongoose
.model("chat",chatSchema);
module.exports=chat;