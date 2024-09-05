// import React from "react";
// import { Link } from "react-router-dom";

// const AuthBtn = ({
//   to = null,
//   active = false,
//   onclick = null,
//   type = "button",
//   text,
//   customClasses = "",
// }) => {
//   return type !== "submit" ? (
//     <>
//       <Link to={to ? to : null} className="outline-none">
//         <button
//           onClick={onclick}
//           className={`text-lg font-normal px-4 py-[0.35rem] md:px-5 md:py-2 tracking-wider ${
//             active
//               ? " bg-blue-600 text-white hover:bg-blue-700"
//               : "bg-[#E4E6EA] text-black"
//           } rounded-md cursor-pointer transition-colors duration-200 shadow-md outline-none ${customClasses}`}
//         >
//           {text}
//         </button>
//       </Link>
//     </>
//   ) : (
//     <>
//       <button
//         type={type}
//         className={`text-lg font-normal px-4 py-[0.35rem] md:px-5 md:py-2 tracking-wider ${
//           active
//             ? " bg-blue-600 text-white hover:bg-blue-700"
//             : "bg-[#E4E6EA] text-black"
//         } rounded-md cursor-pointer transition-colors duration-200 shadow-md outline-none ${customClasses}`}
//       >
//         {text}
//       </button>
//     </>
//   );
// };

// export default AuthBtn;

import React from "react";

const AuthBtn = ({
  disable = false,
  active = false,
  onclick = null,
  type = "button",
  text,
  customClasses = "",
}) => {
  // It's a form submit button, no <Link> needed
  return (
    <button
      disabled={disable}
      type={type}
      onClick={onclick}
      className={`text-lg font-normal px-4 py-[0.35rem] md:px-5 md:py-2 tracking-wider ${
        active
          ? " bg-blue-600 text-white hover:bg-blue-700"
          : "bg-[#E4E6EA] text-black"
      } rounded-md cursor-pointer transition-colors duration-200 shadow-md outline-none ${customClasses}`}
    >
      {text}
    </button>
  );
};

export default AuthBtn;
