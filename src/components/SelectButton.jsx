import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {
    const useStyles = makeStyles({
        selectbutton: {
            border: "1px solid #ffffff",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Poppins",
            cursor: "pointer",
            backgroundColor: selected ? "#D5AD36" : "",
            color: selected ? "#000" : "#ffffff",
            fontWeight: selected ? 700 : 500,
            "&:hover": {
                backgroundColor: "gold",
                color: "black",
            },
            width: "22%",
            margin: 20,
            marginTop: 30
        },
    });

    const classes = useStyles();

    return (
        <span
            onClick={onClick}
            className={classes.selectbutton}
        >
            {children}
        </span>
    );
};

export default SelectButton;
