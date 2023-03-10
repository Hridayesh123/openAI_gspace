const {Configuration, OpenAIApi} = require("openai");
const express = require("express");
const bodyParser =  require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true }));

app.get("/", function(request, response){
    
    response.sendFile(__dirname + "/survey.html");
      
  })

app.post("/", function(request,response){
   var userData=request.body.concerns; //user input stored

   const configuration = new Configuration({
    apiKey: "insert api key",
});
const openai = new OpenAIApi(configuration);

async function runCompletion(){
    const prompt=userData;
    const response = await openai.createCompletion({
        model : "text-davinci-003",
        prompt : prompt,
        max_tokens : 2048,  // env variable  ts
        temperature : 1
    });
     // console ai answer
    var recd= response.data;
    var recd_str= JSON.stringify(recd);
    var recd_prsd= JSON.parse(recd_str);
    console.log(recd_prsd);
    return(recd_prsd.choices[0]["text"]);
  
}
runCompletion().then(x =>{
    response.send(x);
});

   
})



app.listen(3000, function(req,res){
    console.log("server is running on port 3000");
})
