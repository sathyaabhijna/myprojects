import React from "react";
import { useState } from "react";
export const Form=()=>
{
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [isPaymentSelected, setIsPaymentSelected] = useState(false);
    const [selectedBatches, setSelectedBatches] = useState([]);

    async function myfun1()
    {
      const isAgeValid = parseInt(age, 10) >= 18 && parseInt(age, 10) <= 65;
      const phoneRegex = /^[0-9]{10}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name || !phoneNumber || !email || !age) 
      {
        alert("Please fill in all the required fields");
        return;
      }

      if(!isAgeValid) 
      {
        alert("Please enter an age between 18 and 65");
      }
      else if (!emailRegex.test(email)) 
      {
        alert("Please enter a valid email address");
      } 
      else if (!phoneRegex.test(phoneNumber)) 
      {
        alert("Please enter a valid 10-digit phone number");
      } 
      else if (isPaymentSelected) 
      {
        try {
          const response = await fetch("http://localhost:3001/submit-form", 
          {
            method: "POST",
            headers: 
            {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              {
              name,
              age,
              email,
              phoneNumber,
              gender,
              isPaymentSelected,
              selectedBatches,
            }),
          });
  
          const result = await response.json();
  
          if (response.ok) 
          {
            alert(
              "Congratulations!!! Your registration has been successfully completed. Happy Yoga!"
            );
          } else 
          {
            alert("Error submitting the form. Please try again.");
          }
        } catch (error) 
        {
          console.error("Error submitting the form:", error);
          alert("Error submitting the form. Please try again.");
        }
      }
      }
    
    const handleBatchSelection = (batch) => {
      const isSelected = selectedBatches.includes(batch);
      if (isSelected) 
      {
        setSelectedBatches(selectedBatches.filter((selected) => selected !== batch));
      } else 
      {
        setSelectedBatches([...selectedBatches, batch]);
      }
    };
    return (
        <div className="container">
         <center><h1>Welcome</h1></center>
         <center><h2>Registration form for Yoga Classes</h2></center>
          <div class="form-container">
         <form method='POST'>
            <fieldset>
            Enter your Name: <input onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Name"/><br></br><br></br>
            Enter your DOB: <input type="date" name="date" placeholder="Date of Birth"/><br></br><br></br>
            Enter your age: <input onChange={(e) => setAge(e.target.value)} type="text" name="age" placeholder="Age"/><br></br><br></br>
            Enter your email: <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email"/><br></br><br></br>
            Enter your Phno: {" "}
            <input onChange={(e) => setPhoneNumber(e.target.value)} type="tel" name="phno" placeholder="phno"/><br></br><br></br>
            Enter your Gender:<br></br>
            Male  <input type="radio" name="male" checked={gender === "male"} onChange={() => setGender("male")}/>
            Female <input type="radio" nam="female" checked={gender === "female"} onChange={() => setGender("female")}/><br></br><br></br>
            Choose the Batch:<br></br>
            6:00AM-7:00AM <input onChange={() => handleBatchSelection("6:00AM-7:00AM")}
              checked={selectedBatches.includes("6:00AM-7:00AM")} type="checkbox" /><br></br>
            7:00AM-8:00AM <input onChange={() => handleBatchSelection("7:00AM-8:00AM")}
              checked={selectedBatches.includes("7:00AM-8:00AM")} type="checkbox" /><br></br>
            8:00AM-9:00AM <input onChange={() => handleBatchSelection("8:00AM-9:00AM")}
              checked={selectedBatches.includes("8:00AM-9:00AM")} type="checkbox" /><br></br>
            5:00PM-6:00PM <input onChange={() => handleBatchSelection("5:00PM-6:00PM")}
              checked={selectedBatches.includes("5:00PM-6:00PM")} type="checkbox" /><br></br><br></br>
            Payment-500Rs <input type="radio" onChange={(e) => setIsPaymentSelected(e.target.checked)}/><br></br><br></br>
            <center><input type="submit"  onClick={myfun1}/></center>
        </fieldset>
        </form>
        </div>
        </div>
    );
  }