import { CircularProgress } from '@material-ui/core'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Banner from '../components/Banner/Banner'
import ErrorFallback from '../components/ErrorBoundary'
const CoinsTable = React.lazy(() => import("../components/CoinsTable"))

function Homepage() {
    return (
        <>
            <Banner />
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {
                    window.location.reload(false)
                }}
            >
                <Suspense
                    fallback={
                        <CircularProgress
                            color="secondary"
                        />
                    }
                >
                    <CoinsTable />
                </Suspense>
            </ErrorBoundary>
        </>
    )
}

export default Homepage
