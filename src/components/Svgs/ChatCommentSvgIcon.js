import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
const ChatCommentSvgIcon = (props) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={24}
    fill='none'
    {...props}
  >
    <G fill='#333' fillRule='evenodd' clipRule='evenodd'>
      <Path d='M26 33h3.5C36.404 33 42 27.404 42 20.5S36.404 8 29.5 8h-11C11.596 8 6 13.596 6 20.5c0 7.915 5.217 12.754 10.924 15.726 2.835 1.476 5.69 2.43 7.849 3.015.442.12.853.224 1.227.313zm2 9s-.756-.11-2-.392C20.236 40.3 4 35.305 4 20.5 4 12.492 10.492 6 18.5 6h11C37.508 6 44 12.492 44 20.5S37.508 35 29.5 35H28z' />
      <Path d='M24 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM32 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
    </G>
  </Svg>
);
export default ChatCommentSvgIcon;
