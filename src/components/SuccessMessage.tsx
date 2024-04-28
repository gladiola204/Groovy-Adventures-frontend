
interface Props {
    msg: string,
    className?: string,
}

const SuccessMessage: React.FC<Props> = ({ msg, className }) => {
    return(
        <div className={className}>
            {msg}
        </div>
    )
};

export default SuccessMessage;