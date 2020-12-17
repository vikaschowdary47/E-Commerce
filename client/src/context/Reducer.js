export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      console.log("LOGOUT in reducer");
      console.log(state);
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    // console.log(state);
    default:
      return state;
  }
};
