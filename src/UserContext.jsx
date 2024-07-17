// // UserContext.js
// import React, { createContext, useContext, useState } from 'react';

// const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     const loginUser = (userData) => {
//         setUser(userData);
//     };

//     return (
//         <UserContext.Provider value={{ user, loginUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUser = () => useContext(UserContext);


