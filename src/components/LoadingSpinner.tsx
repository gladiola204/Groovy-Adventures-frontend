import CircleLoader from "react-spinners/ClipLoader";

interface Props {
    isLoading: boolean
}

const LoadingCircle: React.FC<Props> = ({ isLoading }) => {
    console.log(isLoading);

    return (
        <>
            {isLoading ? 
                <CircleLoader
                    size={150}
                    aria-label="Loading Circle"
                    data-testid="loader"
                />
            : null}
        </>
    )
};

export default LoadingCircle