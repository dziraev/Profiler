// import React from "react";
// import { Tooltip, Avatar } from "@nextui-org/react";
import styles from './Notification.module.scss';
// import info from '../../static/images/info.png';

// export const Notification = () => {
//   return (
//     <Tooltip content={"Please fill in all the fields in Profiler in English"} placement="topStart">
//       <Avatar
//             pointer
//             src={info}
//           />
//     </Tooltip>
//   );
// }

// import React from "react";
// import styles from './Notification.module.scss';
// import info from '../../static/images/info.png';

// export const Notification = () => {
//   return (

//     // <div class="demo">
//     //   <p>
//     //     <a href="#" data-tooltip="React (also known as React.js or ReactJS) is a JavaScript library[3] for building user interfaces. It ">
//     //       <img src={info} alt='notification'></img>
//     //     </a>
//     //   </p>
//     // </div>


//     // <div>
//     //   <img src={info} alt='notification'></img>
//     // </div>
//   );
// }
import React from "react";

export const Notification = ({ children }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className={styles.wrapper}>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      <div className={styles.tooltip} style={show ? { visibility: "visible" } : {}}>
        <span>Please fill in all the fields in Profiler in <b>English</b></span>
        <span className={styles.tooltipArrow} />
      </div>
    </div>
  );
}

