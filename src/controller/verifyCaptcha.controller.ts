import axios from 'axios';

export const verifyCaptcha = async (token: string): Promise<boolean> => {
  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const res = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret,
          response: token,
        },
      }
    );

    return res.data.success === true;
  } catch (error) {
    console.error("Error al verificar CAPTCHA:", error);
    return false;
  }
};
