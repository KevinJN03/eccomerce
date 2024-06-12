import { HelpOutline } from '@mui/icons-material';

function RevenueContainer({
    title,
    includeQuestion,
    amount,
    text,
    children,
    underline,
}) {
    return (
        <section className="left flex w-full flex-1 flex-col gap-4 rounded-lg border border-dark-gray p-5">
            <p className="flex flex-nowrap  text-base font-semibold">
                {title}

                {includeQuestion && (
                    <span className="items-middle flex pl-1">
                        <HelpOutline fontSize="small" />
                    </span>
                )}
            </p>

            <h2
                className={`text-3xl font-semibold ${underline ? 'underline decoration-dashed underline-offset-8' : ''}	 `}
            >
                {amount}
            </h2>
            <p>{text}</p>

            {children}
        </section>
    );
}

export default RevenueContainer;
