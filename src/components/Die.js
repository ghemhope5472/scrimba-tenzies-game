import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div
      className="dice"
      style={styles}
      onClick={
        props.tenzies
          ? () => console.log("Click new game")
          : () => props.handleClick(props.id)
      }
    >
      <h1> {props.value} </h1>
    </div>
  );
}

export default Die;
