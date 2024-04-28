
interface Props {
    msg: string,
    className?: string,
}

const ErrorMessage: React.FC<Props> = ({ msg, className }) => {
    return (
        <div className={className}>
            {msg}
        </div>
    )
};

export default ErrorMessage;