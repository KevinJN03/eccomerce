import 'dotenv/config';
import sharpify from '../Upload/sharpify';
import s3Upload from './s3Service';
import User from '../Models/user';

const handleProfilePhoto = async (file, id) => {
    if (file) {
      const compressImg = await sharpify(file, 'profile');
      compressImg.id = id;
      await s3Upload({
        files: [compressImg],
        isProfile: true,
        endPoint: 'user',
      });
      const profileImg = `${process.env.UPLOAD_URL}/user/${id}.${compressImg.format}`;
      await User.findByIdAndUpdate(
        id,
        { profileImg },
        { upsert: true, new: true },
      );
    } 
    return
  };

  export default handleProfilePhoto