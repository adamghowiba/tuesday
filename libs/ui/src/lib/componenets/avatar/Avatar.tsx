import React, { CSSProperties, FC } from 'react';
import Image from 'next/image';
import { ExecOptionsWithStringEncoding } from 'child_process';

export interface AvatarProps {
  avatarSrc?: string;
  seed?: string;
  sx?: CSSProperties;
  size?: number;
  alt?: string;
}

const Avatar: FC<AvatarProps> = ({
  avatarSrc,
  seed,
  sx,
  size = 25,
  alt = 'User avatar',
  ...props
}) => {
  const seededAvatar = `https://avatars.dicebear.com/api/initials/:${seed}.svg`;
  const avatar = seed
    ? seededAvatar
    : avatarSrc || '/images/default_avatar.png';

  return (
    <>
      <Image src={avatar} width={size} height={size} alt={alt}></Image>
      <style jsx>{``}</style>
    </>
  );
};

Avatar.defaultProps = {};

export default Avatar;
