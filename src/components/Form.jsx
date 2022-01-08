import {useState, useEffect} from "react";
import {nanoid} from "nanoid";

export const Form = () => {

    const [form_val, setForm_val] = useState([]);

    const [details, setDetails] = useState({
        name: "",
        age: "",
        address: "",
        department: "",
        salary: "",
        status: "",
        profile: ""
    });

    const changeHandler = e => {
        setDetails({...details, [e.target.name]: e.target.value})        
    }
    

    const submit = (e) => {
        e.preventDefault();
        
        addForm();
        setDetails({
            name: "",
            age: "",
            address: "",
            department: "",
            salary: "",
            status: "",
            profile: ""
        })
    }

    useEffect(() => {
        getForm()
    },[])

    const getForm = () => {
        fetch(`/users`)
        .then((d) => d.json()
        .then((res)=> {
            setForm_val(res);
            console.log("form_val",typeof(form_val))
        }))
    }

    const handleDelete = (id) => {

        fetch(`/users/${id}`,{
            method: "DELETE"
        }).then((res) => res.json()
        .then((res) => {
            
            // setForm_val(res); res returns deleted value only            
            getForm();
        }))

        
    }

    const sortBySalary = () => {
        form_val.sort((a,b) => a.salary - b.salary);
        console.log("sorte",form_val)
        setForm_val(form_val);
        // getForm();
    }

    const addForm = () => {
        // e.preventDefault();
        const payload = {
            name: details.name,
            age: details.age,
            address: details.address,
            department: details.department,
            salary: details.salary,
            marital_status: details.status,
            profile: details.profile
        }
        fetch("/users",{
            method: "POST",
            body: JSON.stringify(payload),
            headers:{
                "content-type": "application/json",
            }
        }).then(() => {
            getForm();
            // setText("");
        });
            
        
    }

    return <div className="content">
        
        <div className="form-div">
            <h2>Enter your details</h2>
            <form method="POST" onSubmit={submit}>
            <table>
                <tbody>
                <tr>
                    <td>Name</td>
                    <td><input onChange={changeHandler} value={details.name} type="text" name="name" placeholder="Name" required/></td>
                </tr>
                <tr>
                    <td>Age</td>
                    <td><input onChange={changeHandler} value={details.age} type="text" name="age" placeholder="Age" required /></td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td><input onChange={changeHandler} value={details.address} type="text" name="address" placeholder="Address" required /></td>
                </tr>
                <tr>
                    <td>Department</td>
                    {/* <td><input onChange={changeHandler} value={details.department} type="text" name="department" placeholder="Department" /></td> */}
                    <td>
                        <select onChange={changeHandler} name="department" required>
                            <option></option>
                            <option>CSE</option>
                            <option>ECE</option>
                            <option>EEE</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Salary</td>
                    <td><input onChange={changeHandler} value={details.salary} type="text" name="salary" placeholder="Salary" required /></td>
                </tr>
                <tr>
                    <td>Marital Status</td>
                    <td className="checkbox">
                        <input onClick={changeHandler} value={details.status} type="checkbox" name="status" value="Maried" /><span>Maried</span>
                        <input onClick={changeHandler} value={details.status} type="checkbox" name="status" value="Single" /><span>Single</span>
                    </td>
                    {/* <input onChange={changeHandler} value={details.status} type="text" name="status" placeholder="Marital status" /> */}
                </tr>
                <tr>
                    <td>Profile photo</td>
                    <td><input onChange={(changeHandler)} value={details.profile} type="text" name="profile" id="" /></td>
                </tr>
                </tbody>
            </table>
              
            
            <button type="submit" >Submit</button> <button type="button" onClick={sortBySalary}>Sort by salary</button>
            </form>
            
        </div>

        <div className="right-table">
            <h1>Employee Details</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Marital Status</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Profile</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                
                <tbody>
                
                {form_val.map((e) => (
                    // <div>{}
                    <tr key={nanoid(6)}>
                        <td>{e.name}</td>
                        <td>{e.age}</td>
                        <td>{e.address}</td>
                        <td>{e.marital_status}</td>
                        <td>{e.department}</td>
                        <td>{e.salary}</td>
                        <td> <img src={e.profile} alt="" /> </td>
                        <td><button onClick={ () =>  handleDelete(e._id)}>Delete</button></td>
                        {/* {console.log(e._id)} */}
                    </tr>
                    

                    // </div>
                ))}

                </tbody>
                
            </table>
        </div>
    

    </div>
}