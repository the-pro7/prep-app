import React, { useState, useContext } from "react";
const ButtonContext = React.createContext();
const ButtonUpdater = React.createContext();

export const useButtonSelected = () => useContext(ButtonContext);
export const useButtonUpdater = () => useContext(ButtonUpdater);

const ButtonProivder = ({ children }) => {
  const [selected, setSelected] = useState(true);
  const updateSelection = () => setSelected((prev) => !prev);
  return (
    <ButtonContext.Provider value={selected}>
      <ButtonUpdater.Provider value={updateSelection}>
        {children}
      </ButtonUpdater.Provider>
    </ButtonContext.Provider>
  );
};

export default ButtonProivder;
