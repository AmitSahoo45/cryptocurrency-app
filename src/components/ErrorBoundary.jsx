import { Button, makeStyles } from "@material-ui/core";

function ErrorFallback({ error, resetErrorBoundary }) {
    const useStyles = makeStyles((theme) => ({
        errorBox: {
            margin: '1rem auto',
            textAlign: 'center',
            fontFamily: 'Poppins'
        },
        warning: {
            color: '#ff0000',
            margin: '1rem auto',
        },
        errMsg: {
            fontWeight: 'bold',
            fontSize: '1rem'
        },
        button: {
            backgroundColor: '#ff0000',
            margin: '1rem auto',
            color: 'white',
            "&:hover": {
                backgroundColor: '#de0000',
            }
        }
    }))

    const classes = useStyles();

    return (
        <div role="alert" className={classes.errorBox}>
            <h2 className={classes.warning}>Oops! Something went wrong</h2>
            <pre className={classes.errMsg}>{error.message}</pre>
            <Button
                onClick={resetErrorBoundary}
                variant="outlined"
                className={classes.button}
            >
                Try Again
            </Button>
        </div>
    )
}

export default ErrorFallback;