function LoadingOverlay({ loadingMessage = 'Loading' }) {
    return (
        <div 
            className="ag-overlay-loading-center"
        >{{ loadingMessage }}</div>
    )
}

export default LoadingOverlay;