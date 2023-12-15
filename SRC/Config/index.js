export const baseUrl = "https://roy-api.ad-wize.com";
// export const baseUrl = "https://4b54-113-203-241-1.in.ngrok.io";
export const imageUrl = `https://roy.ad-wize.com`;
export const imageSizeUrl =`https://roy.ad-wize.com/uploads/product/size`;
export const profilePicUrl = `${baseUrl}/uploads`

export const apiDataLimit = 10;
export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
