import { Switch } from "@mui/material";
import React, { useState } from "react";
import { setmode } from "../state/sliceReducer";
import { useDispatch } from "react-redux";

function Setting() {
  const dispatch = useDispatch();
  //   const [check, setcheck] = useState(true);
  return (
    <>
      <div className={`m-10 text-base font-medium flex items-center`}>
        <h4>Mode :</h4>
        <Switch
          // value={check}
          
          onChange={() => dispatch(setmode())}
        />
      </div>
    </>
  );
}

export default Setting;
