import { rest } from "msw";

const baseURL = "https://piehole-drf.onrender.com";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 6,
        username: "Emese",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 6,
        profile_image:
          "https://res.cloudinary.com/do9hkhqiy/image/upload/v1/media/images/pexels-sebastian-libuda-678783_yklp6l",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200))
  }),
];
