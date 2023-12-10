function ResetSent({}) {
    return (
        <section className="w-9/12 flex flex-col gap-y-5 items-center mb-6">
            <h3 className="font-semibold tracking-wider font-gotham text-lg">RESET PASSWORD LINK SENT</h3>

            <p className="text-center">We've sent you an email to reset your password</p>

            <p className="text-center">
                To create your new password, click the link in the email and
                enter a new one - easy
            </p>

            <p className="text-center">
                Didn't receive the email? Check your junk email, any other email
                addresses linked to your GLAMO account, or click below to resend
                the email
            </p>

            <section className="flex flex-row gap-x-3 w-full">
                <button className="border-2 py-3 px-6 font-gotham tracking-wider hover:opacity-60 flex-1">RESEND EMAIL</button>
                <button className="border-2 py-3 px-6 font-gotham tracking-wider hover:opacity-60 flex-1">SIGN IN</button>
            </section>
        </section>
    );
}

export default ResetSent;
