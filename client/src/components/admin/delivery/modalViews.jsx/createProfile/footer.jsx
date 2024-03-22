import { useContent } from '../../../../../context/ContentContext';
import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import BubbleButton from '../../../../buttons/bubbleButton';
import ThemeBtn from '../../../../buttons/themeBtn';

function Footer({}) {
    const { setModalCheck } = useContent();

    const { profile, btnLoad, handleSubmit } = useCreateProfileContext();
    return (
        <footer className="mt-10 flex items-center justify-between">
            <BubbleButton handleClick={() => setModalCheck(() => false)} />

            <ThemeBtn text={'Save profile'} handleClick={handleSubmit}>
                {btnLoad ? (
                    <div className="spinner-circle spinner-sm [--spinner-color:255,255,255]" />
                ) : (
                    <div className="flex flex-row flex-nowrap items-center text-base font-medium text-white">
                        Save profile
                        {profile?.active_listing > 0 && (
                            <span className="ml-2 rounded-full bg-white px-2 py-1 text-xs font-normal">
                                {`Affects ${profile?.active_listing} ${profile.active_listing > 1 ? 'listings' : 'listing'}`}
                            </span>
                        )}
                    </div>
                )}
            </ThemeBtn>
        </footer>
    );
}

export default Footer;
