import express from "express";
import {
  createAllowance,
  deleteAllowance,
  getAllAllowance,
  updateAllowance,
} from "../../controllers/allowance.js";
// import auth, { restrictAccessRoute } from "../../middlewares/auth.js";
// import { checkModelDataCached } from "../../middlewares/cache.js";
const router = express.Router();
// router.use(auth);
// router.use(restrictAccessRoute("HR"));
router.route("/").get(getAllAllowance).post(createAllowance);
router.route("/:id").patch(updateAllowance).delete(deleteAllowance);

export default router;
