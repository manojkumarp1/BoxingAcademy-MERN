const express  = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors());
app.use(express.json());



mongoose.connect('mongodb://127.0.0.1:27017/mano')
                .then(()=>console.log("connected"))
                .catch((err)=>console.log(err))
const schema=new mongoose.Schema({
    email:String,
    password:String,
    username:String,
    mobileNumber:String,
    userRole:String
                    
                })
const schema1=new mongoose.Schema({
    id:Number,
    academyName:String,
    contactNumber:String,
    imageUrl:String,
    emailId:String,
    academyLocation:String,
    academyDescription:String              
                            })
let id1=0; 
const schema2=new mongoose.Schema({
  
    id:Number,
    coursename:String,
        courseduration:String,
        coursetimings:String,
        numberofstudents:Number,
        coursedescription:String
})
let id2=0
const schema3=new mongoose.Schema({
    id:Number,
    coursename:String,
    firstName:String,
    lastName:String,
    gender:String,
    fatherName:String,
    phoneNumber1:String,
    phoneNumber2:String,
    motherName:String,
    emailId:String,
    age:Number,
    houseNo:String,
    streetName:String,
    areaName:String,
   pincode:String,
    state:String,
    nationality:String,
})
let id=0
                
const register=mongoose.model("register",schema)
const academy=mongoose.model("academy",schema1)
const course=mongoose.model("course",schema2)
const student=mongoose.model("student",schema3)



app.post('/login', (req, res) => {
    const {email,password}=req.body

    register.findOne({email:email,password:password}).then((d)=>{
        if(d!=null)
        {
            return res.json({Status: "Success"})
        }
        else
        {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});

        }
    }).catch(()=>console.log("error"))
    
    
})

app.post('/signup', (req, res) => {

   
    const values=[
        req.body.email,
        req.body.password,
        req.body.username,
        req.body.mobileNumber,
        req.body.userRole
    ]
    register.insertMany([req.body]).then((d)=>{return res. json(d)})
    
}) 

app.post('/addacademy', (req, res) => {
    
    id=id+1
    const values={
        id:id,
        
        academyName:req.body.academyName[0],
        
        imageUrl:req.body.imageUrl[0],
        
        academyLocation:req.body.academyLocation[0],
      
}
academy.insertMany([values]).then((d)=>{
    if(d!=null)
    {
    return res.json(d);
    }

}).catch(()=>console.log("error"))

    
})
app.get('/getdetails',(req,res)=>{
    
    
   
    academy.find().then((result)=>{
        if(result==[]) return res.json({Error:"Got an error in the mongo"});
        
        return res.json({Status:"Success",Result:result})
        

    })
})
app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    academy.find({id:id}).then((result)=>{
        if(result==[]) return res.json({Error:"Got an error in the mongo"});
        
        return res.json({Status:"Success",Result:result})
        

    })
})
app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    academy.deleteOne({id:id})
  .then((result) => {
    if (result.deletedCount === 1) {
      console.log('Document deleted successfully.');
      return res.json({Status: "Success"})
    } else {
      console.log('No document matched the condition.');
    }
  })
  .catch((error) => {
    console.error('Error deleting document:', error);
  });
    
})
app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  academy.updateOne( {id:id}, {$set: updatedData})
  .then((result) => {
    if (result.modifiedCount === 1) {
      console.log('Document updated successfully.');
      return res.json({ Status: 'Success' });
    } else {
      console.log('No document matched the condition.');
      return res.json({ Status: 'Error' });
    }
  })
  .catch((error) => {
    console.error('Error updating document:', error);
  });


});
app.get('/getcourses',(req,res)=>{
    course.find().then((result)=>{
        if(result==[]) return res.json({Error:"Got an error in the mongo"});
        
        return res.json({Status:"Success",Result:result})
        

    })

})
app.delete('/deletecourse/:id',(req,res)=>{
    const id = req.params.id;
    
    course.deleteOne({id:id})
    .then((result) => {
      if (result.deletedCount === 1) {
        console.log('Document deleted successfully.');
        return res.json({Status: "Success"})
      } else {
        console.log('No document matched the condition.');
      }
    })
    .catch((error) => {
      console.error('Error deleting document:', error);
    });
    
})
id1=2
app.post('/addcourse', (req, res) => {
    id1=id1+1
    const values={
        id:id1,
        coursename:req.body.coursename[0],
        courseduration:req.body.courseduration[0],
        coursetimings:req.body.coursetimings[0],
        numberofstudents:req.body.numberofstudents[0],
        coursedescription:req.body.coursedescription[0]
    }
    console.log(values)
    course.insertMany([values]).then((data)=>{  
        return res.json(data);

    }).catch((er)=>console.log(er))
    
})
app.get('/getcourse/:id', (req, res) => {
    const id = req.params.id;
    
    course.find({id:id}).then((result)=>{
        if(result==[]) return res.json({Error:"Got an error in the mongo"});
        
        return res.json({Status:"Success",Result:result})
        

    })
    
})
app.put('/updatecourse/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    console.log(req.body)
  
   
    
    course.updateOne( {id:id}, {$set: updatedData})
    .then((result) => {
      if (result.modifiedCount === 1) {
        console.log('Document updated successfully.');
        return res.json({ Status: 'Success' });
      } else {
        console.log('No document matched the condition.');
        return res.json({ Status: 'Error' });
      }
    })
    .catch((error) => {
      console.error('Error updating document:', error);
    });
    
  });
  app.post('/enrollform', (req, res) => {
    id2=id2+1
    const i={id:id2,...req.body}
    const values=[
        req.body.coursename,
        req.body.firstName,
        req.body.lastName,
        req.body.gender,
        req.body.fatherName,
        req.body.phoneNumber1,
        req.body.phoneNumber2,
        req.body.motherName,
        req.body.emailId,
        req.body.age,
        req.body.houseNo,
        req.body.streetName,
        req.body.areaName,
        req.body.pincode,
        req.body.state,
        req.body.nationality,

    ]
    console.log(req.body)
    student.insertMany([i]).then((d)=>{return res. json(d)})
    
})
app.get('/enrolledcourse', (req, res) => {
    
    student.find().then((result)=>{
        if(result==[]) return res.json({Error:"Got an error in the mongo"});
        
        return res.json({Status:"Success",Result:result})
        

    })
    
})
app.get('/getstudents', (req, res) => {
    
    student.find().then((result)=>{
        if(result==[]) return res.json({Error:"Got an error in the mogo"});
        
        return res.json({Status:"Success",Result:result})
        

    })
    
})
app.get('/getstudents/:id', (req, res) => {
    const id = req.params.id;
    
    student.find({id:id}).then((result)=>{
        if(result==[]) return res.json({Error:"Got an error in the mongo"});
        
        return res.json({Status:"Success",Result:result})
        

    })
   
})
app.put('/updatestudents/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    console.log(updatedData)
  
    
    student.updateOne( {id:id}, {$set: updatedData})
    .then((result) => {
      if (result.modifiedCount === 1) {
        console.log('Document updated successfully.');
        return res.json({ Status: 'Success' });
      } else {
        console.log('No document matched the condition.');
        return res.json({ Status: 'Error' });
      }
    })
    
  });
app.delete('/deletestudents/:id',(req,res)=>{
    const id = req.params.id;
    
    student.deleteOne({id:id})
  .then((result) => {
    if (result.deletedCount === 1) {
      console.log('Document deleted successfully.');
      return res.json({Status: "Success"})
    } else {
      console.log('No document matched the condition.');
    }
  })
  .catch((error) => {
    console.error('Error deleting document:', error);
  });
    
})

app.listen(8081, ()=> {
    console.log("Running");
})