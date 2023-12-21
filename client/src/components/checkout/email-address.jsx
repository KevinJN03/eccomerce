import { useAuth } from '../../hooks/useAuth';

function Email_address({ disable }) {
    const { user, authenticated } = useAuth();
    return (
        <section
            id="Email_address"
            className={`flex flex-col gap-4 ${
                disable ? 'disable-component' : 'display-component'
            }`}
        >
            {user?.email ? (
                <>
                    <h1 className="text-xl font-bold tracking-widest">
                        EMAIL ADDRESS
                    </h1>
                    <p className="mb-0 text-sm">{user?.email}</p>
                </>
            ) : (
                <>you need to sign in</>
            )}
        </section>
    );
}

export default Email_address;
