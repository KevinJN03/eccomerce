function ResetSent({}) {
    return (
        <section className="mb-6 flex w-9/12 flex-col items-center gap-y-5">
            <h3 className="font-gotham text-lg font-semibold tracking-wider">
                RESET PASSWORD LINK SENT
            </h3>

            <p className="text-center">
                We've sent you an email to reset your password
            </p>

            <p className="text-center">
                To create your new password, click the link in the email and
                enter a new one - easy
            </p>

            <p className="text-center">
                Didn't receive the email? Check your junk email, any other email
                addresses linked to your GLAMO account, or click below to resend
                the email
            </p>

            <section className="flex w-full flex-row gap-x-3">
                <button className="flex-1 border-2 px-6 py-3 font-gotham tracking-wider hover:opacity-60">
                    RESEND EMAIL
                </button>
                <button className="flex-1 border-2 px-6 py-3 font-gotham tracking-wider hover:opacity-60">
                    SIGN IN
                </button>
            </section>
        </section>
    );
}

export default ResetSent;
