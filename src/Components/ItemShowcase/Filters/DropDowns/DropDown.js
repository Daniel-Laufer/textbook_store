import React, { useState } from "react";
// import { FormControl, Dropdown } from "react-bootstrap";
import "./DropDown.css"

const DropDown = ({ items }) => {
    const [selected, setSelected] = useState(null);


    const handleChange = (e) => {
      selected = items[e.currentTarget.value]
    }
      
    return (

      <select onChange={(e) => console.log(e.target)}>
        <option value={0}>Course</option>
    {
          items.map((item, index) => {
            return(
              <option value={index}>{item}</option>
            );
          })
        }
      </select>
      
    );
  };



// const CustomMenu = ({setValue, value}) => {
//   return (
//     <div>
//       <FormControl
//         autoFocus
//         className="mx-3 my-2 w-auto"
//         placeholder="Type to filter..."
//         onChange={(e) => setValue(e.target.value)}
//         value={value}
//       />
//     </div>
//   );
// };

// const DropDown = ({ items }) => {
//   const [value, setValue] = useState("");
//   const [selected, setSelected] = useState(null)
//   return (
//     <>
//     <Dropdown>
//       <Dropdown.Toggle id="dropdown-custom-components">
//         {selected ? "Course" : value}
//       </Dropdown.Toggle>

//       <Dropdown.Menu className="dropdown-menu">
//     <CustomMenu setValue={setValue} value={value}/>
//       {
//         items.map((item) => {
//           return(
//             item.toLowerCase().startsWith(value.toLowerCase()) ?
//             <Dropdown.Item>{item}</Dropdown.Item> : null
//           );
//         })
//       }
//       </Dropdown.Menu>
//     </Dropdown>
//   </>
//   );
// };

export default DropDown;
