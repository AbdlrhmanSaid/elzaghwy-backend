import rateLimit from "express-rate-limit";

export const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: "لقد قمت بعمل طلبات كثيرة، يرجى المحاولة مرة أخرى بعد 15 دقيقة",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
