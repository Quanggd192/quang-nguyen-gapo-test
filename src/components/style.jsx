// This file just to compact the style code inside components
import styled from 'styled-components'
// Grid components
export const Grid = styled.div`
    width: 60%;
    margin: auto;
    text-align: center;
    z-index: -1;
`
export const Row = styled.div`
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    color: #555;
    font-family: "Inconsolata","Source Code Pro","Consolas","Monaco","Courier",monospace;

`
export const Col3 = styled.div`
    width: 25%;
    margin: 0 0 0 0;
    padding: 0 5px 0 5px;
`
export const Col9 = styled.div`
    width: 75%;
    margin: 0 0 0 0;
    padding: 0 5px 0 5px;
`
export const Button = styled.button`
    width: 60px;
    height: 25px;
    border-radius: 5px;
    border: solid 1px #777;
    cursor: pointer;
    background: #fff;
    color: #555;
`
// Modal style 
export const outerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    zIndex: 1
}
export const modalStyle = {
    modal: {
        position: "relative",
        width: 500,
        minHeight: 500,
        padding: 20,
        boxSizing: "border-box",
        backgroundColor: "#fff",
        margin: "40px auto",
        borderRadius: 3,
        zIndex: 2,
        textAlign: "left",
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
        // ...this.props.style.modal
    },
    overlay: {
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        // ...this.props.style.overlay
    }
}