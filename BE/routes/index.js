import { Router } from "express";
import user from "./user/index.js";
import book from "./book/index.js";
const router = Router();

router.use("/user", user);
router.use("/book",book);

export default router;